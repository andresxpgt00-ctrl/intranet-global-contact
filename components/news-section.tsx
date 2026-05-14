"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight, Bell, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const news = [
  {
    id: 1,
    type: "alert",
    title: "Incapacidades Transcritas",
    description: "Aviso importante sobre el proceso de incapacidades transcritas. Revisa las nuevas directrices actualizadas.",
    date: "14 Mayo 2026",
    href: "/noticias/incapacidades",
    priority: "high",
  },
  {
    id: 2,
    type: "news",
    title: "Procesador Tarjeta Crédito Webphone",
    description: "Nueva funcionalidad disponible para el procesamiento de tarjetas de crédito a través de Webphone.",
    date: "12 Mayo 2026",
    href: "/noticias/procesador-tarjeta",
    priority: "medium",
  },
  {
    id: 3,
    type: "update",
    title: "Uso de Medios Tecnológicos",
    description: "Recursos actualizados sobre el uso de medios tecnológicos e infraestructura disponible.",
    date: "10 Mayo 2026",
    href: "/noticias/medios-tecnologicos",
    priority: "normal",
  },
  {
    id: 4,
    type: "news",
    title: "Sales Copilot - Nueva Actualización",
    description: "Sales Copilot ha recibido nuevas mejoras para ayudarte en tus gestiones de ventas.",
    date: "8 Mayo 2026",
    href: "/noticias/sales-copilot-update",
    priority: "medium",
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "alert":
      return AlertTriangle
    case "update":
      return Bell
    default:
      return Info
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground"
    case "medium":
      return "bg-primary text-primary-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function NewsSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              <Bell className="h-4 w-4" />
              Noticias y Avisos
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl font-bold tracking-tight text-balance"
            >
              Mantente informado
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/noticias">
              <Button variant="outline" className="gap-2">
                Ver todas las noticias
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {news.map((item, index) => {
            const Icon = getIcon(item.type)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getPriorityColor(item.priority)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.date}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mt-4 group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {item.description}
                      </CardDescription>
                      <Button variant="ghost" className="p-0 h-auto mt-4 text-primary hover:text-primary/80">
                        Leer más
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
