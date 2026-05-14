'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Heart,
  MessageCircle,
  Pin,
  Send,
  Image as ImageIcon,
  MoreHorizontal,
  Shield,
  Trophy,
  BookOpen,
  Newspaper,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Author {
  id: string
  full_name: string
  avatar_url?: string
  position?: string
  department?: string
}

interface Category {
  id: string
  name: string
  slug: string
  color: string
  icon?: string
}

interface Post {
  id: string
  title: string
  content: string
  image_url?: string
  is_pinned: boolean
  likes_count: number
  comments_count: number
  created_at: string
  author: Author
  category: Category | null
}

interface FeedSectionProps {
  initialPosts: Post[]
  categories: Category[]
  currentUserId?: string
}

const categoryIcons: Record<string, React.ElementType> = {
  bienestar: Heart,
  seguridad: Shield,
  reconocimientos: Trophy,
  capacitacion: BookOpen,
  noticias: Newspaper,
  general: MessageCircle,
}

export function FeedSection({ initialPosts, categories, currentUserId }: FeedSectionProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [posting, setPosting] = useState(false)
  const supabase = createClient()

  const handleCreatePost = async () => {
    if (!newPost.trim() || !currentUserId) return
    setPosting(true)

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          user_id: currentUserId,
          title: newPost.slice(0, 100),
          content: newPost,
          category_id: selectedCategory || null,
        })
        .select(`
          *,
          author:profiles!posts_user_id_fkey(id, full_name, avatar_url, position, department),
          category:categories(id, name, slug, color, icon)
        `)
        .single()

      if (error) throw error

      setPosts([data, ...posts])
      setNewPost('')
      setSelectedCategory('')
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setPosting(false)
    }
  }

  const handleLike = async (postId: string) => {
    if (!currentUserId) return

    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', currentUserId)
        .single()

      if (existingLike) {
        // Unlike
        await supabase.from('likes').delete().eq('id', existingLike.id)
        setPosts(posts.map(p => 
          p.id === postId ? { ...p, likes_count: p.likes_count - 1 } : p
        ))
      } else {
        // Like
        await supabase.from('likes').insert({ post_id: postId, user_id: currentUserId })
        setPosts(posts.map(p => 
          p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p
        ))
      }

      // Update post likes count
      const post = posts.find(p => p.id === postId)
      if (post) {
        await supabase
          .from('posts')
          .update({ likes_count: existingLike ? post.likes_count - 1 : post.likes_count + 1 })
          .eq('id', postId)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <Textarea
          placeholder="Comparte algo con tu equipo..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="min-h-[100px] border-0 resize-none focus-visible:ring-0 text-base"
        />
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ImageIcon className="h-4 w-4 mr-2" />
              Imagen
            </Button>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px] h-8 text-sm">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleCreatePost}
            disabled={!newPost.trim() || posting}
            className="rounded-full bg-foreground text-background hover:bg-foreground/90"
          >
            {posting ? 'Publicando...' : 'Publicar'}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay publicaciones aun.</p>
            <p className="text-sm">Se el primero en compartir algo.</p>
          </div>
        ) : (
          posts.map((post) => {
            const CategoryIcon = post.category 
              ? categoryIcons[post.category.slug] || MessageCircle 
              : MessageCircle
            const initials = post.author?.full_name
              ?.split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase() || '?'

            return (
              <article
                key={post.id}
                className="bg-card border border-border rounded-2xl p-5 transition-shadow hover:shadow-sm"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-foreground text-background text-sm">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{post.author?.full_name}</span>
                        {post.is_pinned && (
                          <Pin className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{post.author?.position || post.author?.department}</span>
                        <span>·</span>
                        <span>
                          {formatDistanceToNow(new Date(post.created_at), {
                            addSuffix: true,
                            locale: es,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Reportar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Category Badge */}
                {post.category && (
                  <div className="mt-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: post.category.color }}
                    >
                      <CategoryIcon className="h-3 w-3" />
                      {post.category.name}
                    </span>
                  </div>
                )}

                {/* Content */}
                <p className="mt-4 text-foreground whitespace-pre-wrap">{post.content}</p>

                {/* Image */}
                {post.image_url && (
                  <div className="mt-4 rounded-xl overflow-hidden">
                    <img
                      src={post.image_url}
                      alt=""
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Heart className="h-4 w-4 mr-1.5" />
                    {post.likes_count > 0 && post.likes_count}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-1.5" />
                    {post.comments_count > 0 && post.comments_count}
                  </Button>
                </div>
              </article>
            )
          })
        )}
      </div>
    </div>
  )
}
