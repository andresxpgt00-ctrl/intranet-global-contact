"use client"

import { motion } from "framer-motion"
import { Phone, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  "Asistencia inteligente en tiempo real",
  "Scripts y respuestas optimizadas",
  "Integración con tus herramientas",
  "Disponible 24/7",
]

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 lg:p-16"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/20 text-sm mb-6">
                <Sparkles className="h-4 w-4" />
                Herramienta Destacada
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
                Potencia tus ventas con Sales Copilot
              </h2>

              <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                Tu asistente de ventas impulsado por IA. Obtén respuestas 
                instantáneas, scripts optimizados y soporte en tiempo real 
                para cerrar más ventas.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="https://copilot.smart-products.co/" target="_blank">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Phone className="mr-2 h-5 w-5" />
                  Acceder a Sales Copilot
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
                {/* Chat Preview */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-medium">
                      AI
                    </div>
                    <div className="flex-1 bg-primary-foreground/10 rounded-lg p-3 text-sm">
                      ¡Hola! Soy tu Sales Copilot. ¿En qué puedo ayudarte hoy?
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1 bg-primary-foreground rounded-lg p-3 text-sm text-primary max-w-[80%]">
                      Necesito un script para manejar objeciones de precio
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center text-xs font-medium text-primary">
                      TU
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-medium">
                      AI
                    </div>
                    <div className="flex-1 bg-primary-foreground/10 rounded-lg p-3 text-sm">
                      <p className="mb-2">Aquí tienes 3 técnicas efectivas:</p>
                      <ol className="list-decimal list-inside space-y-1 text-primary-foreground/80">
                        <li>Reencuadre del valor...</li>
                        <li>Comparación de costos...</li>
                        <li>Opciones de pago...</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-foreground/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
