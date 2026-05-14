"use client"

import { useEffect, useMemo, useState } from "react"
import type { ElementType } from "react"
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardCopy,
  Clock,
  Edit3,
  FileText,
  GraduationCap,
  HeartPulse,
  Home,
  LayoutDashboard,
  Library,
  Menu,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  X,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const STORAGE_KEY = "global-contact-intranet-content"

type Item = {
  id: string
  title: string
  description: string
  section: string
  audience: string
  updated: string
  status: "Publicado" | "Borrador" | "Revisión"
}

type Section = {
  id: string
  label: string
  description: string
  icon: string
  items: string[]
}

const icons: Record<string, ElementType> = {
  Home,
  Library,
  GraduationCap,
  WalletCards,
  HeartPulse,
  BriefcaseBusiness,
  ShieldCheck,
  Users,
  Settings,
  FileText,
  CalendarDays,
}

const initialSections: Section[] = [
  {
    id: "inicio",
    label: "Inicio",
    description: "Resumen diario, anuncios prioritarios y accesos rápidos para colaboradores.",
    icon: "Home",
    items: ["Noticias internas", "Comunicados", "Global Points", "Bonificaciones"],
  },
  {
    id: "compania",
    label: "Compañía",
    description: "Información institucional, cultura, equipo, políticas y contactos clave.",
    icon: "Users",
    items: ["Compañía", "Contacto", "Global News", "Smart Travel"],
  },
  {
    id: "herramientas",
    label: "Herramientas",
    description: "Servicios operativos para ventas, soporte, postventa, calculadoras y control de procesos.",
    icon: "BriefcaseBusiness",
    items: ["Calculadora", "Pagos", "Postventa", "Cliente", "Leads Face"],
  },
  {
    id: "recursos",
    label: "Recursos y materiales",
    description: "Biblioteca de materiales digitales, redes sociales, catálogos, tallas y listas de precios.",
    icon: "Library",
    items: ["Material", "Material Redes", "Catálogo Multiven", "Lista de precios", "Tallas"],
  },
  {
    id: "capacitacion",
    label: "Capacitación",
    description: "Academias, tips de venta, coaching, inglés, oficios y belleza para fortalecer habilidades.",
    icon: "GraduationCap",
    items: ["Academia", "Smart Academias", "Tips de Ventas", "Coaching", "Inglés", "Aprende oficios"],
  },
  {
    id: "bienestar",
    label: "Bienestar",
    description: "Pausas activas, seguridad, salud, campañas internas y contenidos de cuidado del colaborador.",
    icon: "HeartPulse",
    items: ["Pausas", "Cartilla Pausas", "Covid", "Vacuna", "Zona"],
  },
  {
    id: "productos",
    label: "Productos internos",
    description: "Fichas y contenidos de apoyo sobre productos, beneficios, argumentos y material comercial.",
    icon: "FileText",
    items: ["Producto", "Multiven", "Bacticure", "Prostabionic", "Kami Hot", "SleepZen", "Zero Diet"],
  },
]

const initialItems: Item[] = [
  {
    id: "novedad-1",
    title: "Nueva biblioteca de recursos comerciales",
    description: "Centraliza material de redes, catálogos, guías de producto, tallas y listas de precios para consulta rápida.",
    section: "recursos",
    audience: "Ventas y soporte",
    updated: "2026-05-14",
    status: "Publicado",
  },
  {
    id: "novedad-2",
    title: "Programa de capacitación semanal",
    description: "Incluye academia, coaching, tips de ventas, inglés y módulos por producto para nuevos ingresos.",
    section: "capacitacion",
    audience: "Todos los empleados",
    updated: "2026-05-14",
    status: "Publicado",
  },
  {
    id: "novedad-3",
    title: "Panel de servicios internos",
    description: "Accesos a pagos, postventa, calculadora, cliente, leads y herramientas de seguimiento operativo.",
    section: "herramientas",
    audience: "Operaciones",
    updated: "2026-05-14",
    status: "Revisión",
  },
]

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export function IntranetPortal() {
  const [view, setView] = useState<"usuario" | "admin">("usuario")
  const [query, setQuery] = useState("")
  const [activeSection, setActiveSection] = useState("inicio")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [items, setItems] = useState<Item[]>(initialItems)
  const [sections] = useState<Section[]>(initialSections)
  const [draft, setDraft] = useState<Item>({
    id: "",
    title: "",
    description: "",
    section: "inicio",
    audience: "Todos los empleados",
    updated: new Date().toISOString().slice(0, 10),
    status: "Borrador",
  })

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) setItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const filteredSections = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return sections
    return sections.filter((section) =>
      [section.label, section.description, ...section.items].join(" ").toLowerCase().includes(term),
    )
  }, [query, sections])

  const visibleItems = useMemo(() => {
    return items.filter((item) => view === "admin" || item.status === "Publicado")
  }, [items, view])

  function saveContent() {
    if (!draft.title.trim()) return
    const payload: Item = {
      ...draft,
      id: draft.id || slugify(`${draft.title}-${Date.now()}`),
      updated: new Date().toISOString().slice(0, 10),
    }
    setItems((current) => {
      const exists = current.some((item) => item.id === payload.id)
      return exists ? current.map((item) => (item.id === payload.id ? payload : item)) : [payload, ...current]
    })
    setDraft({ id: "", title: "", description: "", section: "inicio", audience: "Todos los empleados", updated: new Date().toISOString().slice(0, 10), status: "Borrador" })
  }

  function copyContent(item: Item) {
    setDraft({ ...item, id: "", title: `${item.title} copia`, status: "Borrador" })
  }

  const NavIcon = icons[sections.find((section) => section.id === activeSection)?.icon || "Home"]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Global Contact</p>
              <p className="text-xs text-muted-foreground">Intranet corporativa</p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {sections.slice(0, 6).map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${activeSection === section.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant={view === "usuario" ? "default" : "outline"} className="rounded-full" onClick={() => setView("usuario")}>Usuario</Button>
            <Button variant={view === "admin" ? "default" : "outline"} className="hidden rounded-full sm:inline-flex" onClick={() => setView("admin")}>Administrador</Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}><Menu className="h-5 w-5" /></Button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background p-6 lg:hidden">
          <div className="mb-8 flex items-center justify-between">
            <p className="font-semibold">Menú interno</p>
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}><X className="h-5 w-5" /></Button>
          </div>
          <div className="grid gap-2">
            {sections.map((section) => (
              <button key={section.id} onClick={() => { setActiveSection(section.id); setMobileOpen(false) }} className="rounded-2xl border border-border p-4 text-left">
                {section.label}
              </button>
            ))}
            <Button className="mt-4 rounded-full" onClick={() => { setView("admin"); setMobileOpen(false) }}>Vista administrador</Button>
          </div>
        </div>
      )}

      <section className="dotted-bg border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:px-8 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <Badge className="mb-6 rounded-full" variant="outline">Portal para empleados</Badge>
            <h1 className="display-lg max-w-4xl">Toda la operación interna en un solo lugar.</h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Una intranet para publicar noticias, consultar recursos, acceder a herramientas, capacitar equipos y administrar contenido desde GitHub o desde la vista de administrador.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="rounded-full" onClick={() => setView("usuario")}><LayoutDashboard className="mr-2 h-4 w-4" /> Ver como usuario</Button>
              <Button size="lg" variant="outline" className="rounded-full" onClick={() => setView("admin")}><ShieldCheck className="mr-2 h-4 w-4" /> Administrar contenido</Button>
            </div>
          </motion.div>

          <Card className="rounded-[2rem] border-border bg-card/85 shadow-sm backdrop-blur">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Vista activa</p>
                  <p className="text-2xl font-semibold capitalize">{view}</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-muted"><NavIcon className="h-5 w-5" /></div>
              </div>
              <div className="grid gap-3">
                {[
                  ["Servicios", "Pagos, postventa, calculadoras"],
                  ["Capacitación", "Academia, coaching, tips"],
                  ["Materiales", "Redes, catálogos, precios"],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-border bg-background p-4">
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Mapa de la intranet</h2>
            <p className="mt-2 text-muted-foreground">Estructura tomada del archivo global.rar y reorganizada para uso interno.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="rounded-full pl-9" placeholder="Buscar sección, servicio o recurso" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
        </div>

        <Tabs value={view} onValueChange={(value) => setView(value as "usuario" | "admin")}>
          <TabsList className="mb-8 rounded-full bg-muted p-1">
            <TabsTrigger value="usuario" className="rounded-full">Vista usuario</TabsTrigger>
            <TabsTrigger value="admin" className="rounded-full">Vista administrador</TabsTrigger>
          </TabsList>

          <TabsContent value="usuario" className="space-y-10">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredSections.map((section) => {
                const Icon = icons[section.icon] || FileText
                return (
                  <button key={section.id} onClick={() => setActiveSection(section.id)} className={`rounded-[1.5rem] border p-5 text-left transition hover:-translate-y-1 hover:shadow-sm ${activeSection === section.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>
                    <Icon className="mb-4 h-6 w-6" />
                    <h3 className="text-xl font-semibold">{section.label}</h3>
                    <p className={`mt-2 text-sm ${activeSection === section.id ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{section.description}</p>
                  </button>
                )
              })}
            </div>

            <section className="rounded-[2rem] border border-border bg-card p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{sections.find((section) => section.id === activeSection)?.label}</h3>
                  <p className="mt-1 text-muted-foreground">Accesos disponibles para empleados.</p>
                </div>
                <Badge variant="secondary" className="rounded-full">{sections.find((section) => section.id === activeSection)?.items.length || 0} accesos</Badge>
              </div>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {sections.find((section) => section.id === activeSection)?.items.map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-background p-4">
                    <div className="mb-3 flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /><span className="font-medium">{item}</span></div>
                    <p className="text-sm text-muted-foreground">Consulta, descarga o solicita actualización del contenido interno.</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-2xl font-semibold">Comunicados recientes</h3>
              <div className="grid gap-4 lg:grid-cols-3">
                {visibleItems.map((item) => (
                  <Card key={item.id} className="rounded-[1.5rem] border-border">
                    <CardContent className="p-5">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <Badge className="rounded-full" variant="secondary">{sections.find((section) => section.id === item.section)?.label}</Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {item.updated}</span>
                      </div>
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.audience}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="admin" className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <Card className="rounded-[2rem] border-border">
              <CardContent className="p-6">
                <div className="mb-6">
                  <Badge className="mb-3 rounded-full"><Edit3 className="mr-1 h-3 w-3" /> Administrador</Badge>
                  <h3 className="text-2xl font-semibold">Crear o editar contenido</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Los cambios se guardan localmente para prototipo. En GitHub se podrán editar estos datos en el código o conectarlos a un CMS.</p>
                </div>
                <div className="grid gap-4">
                  <Input placeholder="Título" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
                  <Textarea placeholder="Descripción" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={draft.section} onChange={(event) => setDraft({ ...draft, section: event.target.value })}>
                      {sections.map((section) => <option key={section.id} value={section.id}>{section.label}</option>)}
                    </select>
                    <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as Item["status"] })}>
                      <option>Publicado</option>
                      <option>Borrador</option>
                      <option>Revisión</option>
                    </select>
                  </div>
                  <Input placeholder="Audiencia" value={draft.audience} onChange={(event) => setDraft({ ...draft, audience: event.target.value })} />
                  <Button className="rounded-full" onClick={saveContent}><Plus className="mr-2 h-4 w-4" /> Guardar contenido</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Contenido administrable</h3>
                <Badge variant="outline" className="rounded-full">{items.length} registros</Badge>
              </div>
              {items.map((item) => (
                <Card key={item.id} className="rounded-[1.5rem] border-border">
                  <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge variant={item.status === "Publicado" ? "default" : "secondary"} className="rounded-full">{item.status}</Badge>
                        <span className="text-xs text-muted-foreground">{sections.find((section) => section.id === item.section)?.label}</span>
                      </div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="rounded-full" onClick={() => setDraft(item)}><Edit3 className="mr-2 h-4 w-4" /> Editar</Button>
                      <Button variant="outline" className="rounded-full" onClick={() => copyContent(item)}><ClipboardCopy className="mr-2 h-4 w-4" /> Copiar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="border-t border-border bg-muted/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Global Contact Intranet · Prototipo listo para GitHub</p>
          <p className="flex items-center gap-2"><Bell className="h-4 w-4" /> Noticias, servicios, herramientas y capacitación para empleados</p>
        </div>
      </footer>
    </main>
  )
}
