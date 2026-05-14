"use client"

import { motion } from "framer-motion"
import { 
  FileText, 
  Video, 
  Image as ImageIcon, 
  Download, 
  ArrowRight,
  FolderOpen,
  Search
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const resources = [
  {
    id: 1,
    type: "document",
    title: "Manual de Procesos",
    description: "Guía completa de procedimientos operativos",
    category: "Documentación",
    downloads: 234,
    href: "/recursos/ayuda/manual-procesos",
  },
  {
    id: 2,
    type: "video",
    title: "Tutorial Webphone",
    description: "Video explicativo del uso del procesador",
    category: "Videos",
    downloads: 156,
    href: "/recursos/videos/tutorial-webphone",
  },
  {
    id: 3,
    type: "image",
    title: "Kit Redes Sociales",
    description: "Plantillas y assets para publicaciones",
    category: "Diseño",
    downloads: 89,
    href: "/recursos/redes/kit-social",
  },
  {
    id: 4,
    type: "document",
    title: "Políticas de Incapacidad",
    description: "Documento actualizado de políticas",
    category: "Documentación",
    downloads: 312,
    href: "/recursos/ayuda/politicas-incapacidad",
  },
]

const categories = [
  { name: "Todos", count: 156, active: true },
  { name: "Documentación", count: 67 },
  { name: "Videos", count: 34 },
  { name: "Diseño", count: 28 },
  { name: "Plantillas", count: 27 },
]

const getIcon = (type: string) => {
  switch (type) {
    case "video":
      return Video
    case "image":
      return ImageIcon
    default:
      return FileText
  }
}

export function ResourcesSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <FolderOpen className="h-4 w-4" />
            Librería de Recursos
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-balance"
          >
            Recursos más descargados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Accede a documentos, videos, plantillas y más materiales de trabajo.
          </motion.p>
        </div>

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar recursos..."
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.name}
                variant={cat.active ? "default" : "outline"}
                size="sm"
                className="gap-1"
              >
                {cat.name}
                <Badge variant="secondary" className="ml-1 text-xs bg-background/20">
                  {cat.count}
                </Badge>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => {
            const Icon = getIcon(resource.type)
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={resource.href}>
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="w-fit text-xs">
                        {resource.category}
                      </Badge>
                      <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {resource.description}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {resource.downloads} descargas
                        </span>
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/recursos/libreria">
            <Button size="lg" variant="outline" className="gap-2">
              Ver toda la librería
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
