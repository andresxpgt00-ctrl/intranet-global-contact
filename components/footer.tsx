"use client"

import { motion } from "framer-motion"
import { 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const footerLinks = {
  compania: [
    { name: "Nosotros", href: "/compania/nosotros" },
    { name: "Misión y Visión", href: "/compania/mision" },
    { name: "Equipo", href: "/compania/equipo" },
    { name: "Carreras", href: "/compania/carreras" },
  ],
  recursos: [
    { name: "Material de Ayuda", href: "/recursos/ayuda" },
    { name: "Material Digital Redes", href: "/recursos/redes" },
    { name: "Galería", href: "/recursos/galeria" },
    { name: "Librería", href: "/recursos/libreria" },
  ],
  herramientas: [
    { name: "Sales Copilot", href: "https://copilot.smart-products.co/", external: true },
    { name: "Webphone", href: "/herramientas/webphone" },
    { name: "Portal de Incapacidades", href: "/herramientas/incapacidades" },
  ],
  legal: [
    { name: "Política de Privacidad", href: "/legal/privacidad" },
    { name: "Términos de Uso", href: "/legal/terminos" },
    { name: "Cookies", href: "/legal/cookies" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/globalcontact" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/globalcontact" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/globalcontact" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/globalcontact" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Mantente actualizado</h3>
              <p className="text-background/60">Recibe las últimas noticias y actualizaciones directamente en tu correo.</p>
            </div>
            <div className="flex gap-2 w-full lg:w-auto">
              <Input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40 max-w-xs"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Globe className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">
                GLOBAL<span className="text-primary">CONTACT</span>
              </span>
            </Link>
            <p className="text-background/60 mb-6 max-w-xs">
              Tu centro de recursos corporativo. Accede a herramientas, 
              materiales y noticias para potenciar tu productividad.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-background/60">
              <a href="tel:+571234567890" className="flex items-center gap-2 hover:text-background transition-colors">
                <Phone className="h-4 w-4" />
                +57 123 456 7890
              </a>
              <a href="mailto:contacto@global-contact.co" className="flex items-center gap-2 hover:text-background transition-colors">
                <Mail className="h-4 w-4" />
                contacto@global-contact.co
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Bogotá, Colombia</span>
              </div>
            </div>
          </div>

          {/* Compañía */}
          <div>
            <h4 className="font-semibold mb-4">Compañía</h4>
            <ul className="space-y-3">
              {footerLinks.compania.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Herramientas */}
          <div>
            <h4 className="font-semibold mb-4">Herramientas</h4>
            <ul className="space-y-3">
              {footerLinks.herramientas.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    target={link.external ? "_blank" : undefined}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/60">
              © 2026 Global Contact. Todos los derechos reservados.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/60 hover:text-background transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-background/60 hover:text-background hover:bg-background/10"
            >
              Volver arriba
              <ArrowUp className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
