"use client"

import { motion } from "framer-motion"
import { Search, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Portal Corporativo Actualizado
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Tu centro de recursos
              <span className="block text-primary-foreground/70">Global Contact</span>
            </h1>

            <p className="text-lg text-background/70 mb-8 leading-relaxed">
              Accede a todos los recursos, materiales de ayuda, herramientas y 
              noticias de la compañía en un solo lugar. Diseñado para potenciar 
              tu productividad.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar recursos, materiales, productos..."
                  className="pl-10 h-12 bg-background text-foreground border-0"
                />
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-6">
                Buscar
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-3">
              <Link href="/recursos/ayuda">
                <Button variant="outline" className="bg-background/10 border-background/20 text-background hover:bg-background/20">
                  Material de Ayuda
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://copilot.smart-products.co/" target="_blank">
                <Button variant="outline" className="bg-background/10 border-background/20 text-background hover:bg-background/20">
                  <Play className="mr-2 h-4 w-4" />
                  Sales Copilot
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { number: "500+", label: "Recursos Disponibles" },
              { number: "24/7", label: "Soporte Continuo" },
              { number: "100%", label: "Digital y Accesible" },
              { number: "10+", label: "Años de Experiencia" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-xl p-6 text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-background/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
