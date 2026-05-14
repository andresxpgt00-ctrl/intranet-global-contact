import { createClient } from '@/lib/supabase/server'
import { Users, Newspaper, Calendar, Trophy } from 'lucide-react'

export async function QuickStats() {
  const supabase = await createClient()

  // Get counts
  const [
    { count: usersCount },
    { count: postsCount },
    { count: activitiesCount },
    { count: recognitionsCount },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('activities').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('posts').select('*', { count: 'exact', head: true })
      .eq('is_published', true)
      .eq('category_id', (await supabase.from('categories').select('id').eq('slug', 'reconocimientos').single()).data?.id),
  ])

  const stats = [
    { label: 'Colaboradores', value: usersCount || 0, icon: Users },
    { label: 'Publicaciones', value: postsCount || 0, icon: Newspaper },
    { label: 'Actividades', value: activitiesCount || 0, icon: Calendar },
    { label: 'Reconocimientos', value: recognitionsCount || 0, icon: Trophy },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-2xl p-5 transition-shadow hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                <Icon className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
