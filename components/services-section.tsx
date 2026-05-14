"use client"

import { motion } from "framer-motion"
import { 
  Headphones, 
  FileText, 
  Package, 
  Users, 
  MessageSquare,
  BookOpen,
  ArrowRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Headphones,
    title: "Sales Copilot",
    description: "Herramienta de asistencia inteligente para ventas. Accede a scripts, respuestas y soporte en tiempo real.",
    href: "https://copilot.smart-products.co/",
    external: true,
    highlight: true,
  },
  {
    icon: FileText,
    title: "Material Digital Redes",
    description: "Recursos digitales actualizados para redes sociales y comunicación corporativa.",
    href: "/recursos/redes",
    external: false,
  },
  {
    icon: Package,
    title: "Productos",
    description: "Catálogo completo de nuestros productos y servicios disponibles.",
    href: "/productos",
    external: false,
  },
  {
    icon: BookOpen,
    title: "Material de Ayuda",
    description: "Guías, tutoriales y documentación para resolver tus dudas rápidamente.",
    href: "/recursos/ayuda",
    external: false,
  },
  {
    icon: Users,
    title: "Compañía",
    description: "Conoce nuestra historia, misión, visión y el equipo que hace posible Global Contact.",
    href: "/compania",
    external: false,
  },
  {
    icon: MessageSquare,
    title: "Contacto",
    description: "Comunícate con nosotros para cualquier consulta o soporte que necesites.",
    href: "/contacto",
    external: false,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Nuestros Servicios
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-balance"
          >
            Todo lo que necesitas en un solo lugar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Accede a recursos, herramientas y materiales diseñados para 
            mejorar tu desempeño y productividad diaria.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={item}>
              <Link 
                href={service.href} 
                target={service.external ? "_blank" : undefined}
                className="block h-full"
              >
                <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group ${service.highlight ? 'border-primary bg-primary/5' : ''}`}>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${service.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted group-hover:bg-primary group-hover:text-primary-foreground'}`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {service.title}
                      {service.highlight && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Nuevo</span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform">
                      {service.external ? "Abrir herramienta" : "Ver más"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
