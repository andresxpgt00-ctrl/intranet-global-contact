"use client"

import { motion } from "framer-motion"
import { Play, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

const videos = [
  {
    id: 1,
    title: "Uso de Medios Tecnológicos e Infraestructura",
    duration: "5:32",
    thumbnail: "/api/placeholder/640/360",
    category: "Tutorial",
  },
  {
    id: 2,
    title: "Procesador Tarjeta Crédito Webphone",
    duration: "8:15",
    thumbnail: "/api/placeholder/640/360",
    category: "Herramientas",
  },
  {
    id: 3,
    title: "Introducción a Sales Copilot",
    duration: "4:48",
    thumbnail: "/api/placeholder/640/360",
    category: "Ventas",
  },
]

export function GallerySection() {
  const [activeVideo, setActiveVideo] = useState(0)

  return (
    <section className="py-20 lg:py-28 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 text-sm mb-6">
              <Play className="h-4 w-4" />
              Galería Multimedia
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6 text-balance">
              Aprende con nuestros
              <span className="block text-background/70">videos tutoriales</span>
            </h2>
            
            <p className="text-lg text-background/70 mb-8 leading-relaxed">
              Explora nuestra colección de videos educativos, tutoriales y 
              contenido multimedia para mejorar tus habilidades y conocimientos.
            </p>

            {/* Video List */}
            <div className="space-y-3">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    activeVideo === index 
                      ? 'bg-background/20 border border-background/30' 
                      : 'bg-background/5 hover:bg-background/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activeVideo === index ? 'bg-primary' : 'bg-background/20'
                    }`}>
                      <Play className="h-4 w-4" fill={activeVideo === index ? "currentColor" : "none"} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{video.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-background/60">
                        <span>{video.category}</span>
                        <span>•</span>
                        <span>{video.duration}</span>
                      </div>
                    </div>
                    <ArrowRight className={`h-5 w-5 transition-transform ${
                      activeVideo === index ? 'translate-x-1' : ''
                    }`} />
                  </div>
                </button>
              ))}
            </div>

            <Link href="/recursos/galeria" className="inline-block mt-8">
              <Button variant="outline" className="bg-background/10 border-background/20 text-background hover:bg-background/20">
                Ver toda la galería
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-background/10 border-background/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video relative bg-background/5 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                  <div className="relative z-10 text-center">
                    <button className="w-20 h-20 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors group">
                      <Play className="h-8 w-8 text-primary-foreground group-hover:scale-110 transition-transform" fill="currentColor" />
                    </button>
                    <p className="mt-4 font-medium">{videos[activeVideo].title}</p>
                    <p className="text-sm text-background/60">{videos[activeVideo].duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
