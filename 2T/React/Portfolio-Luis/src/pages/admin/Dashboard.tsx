import { Link } from "react-router-dom"
import { ShieldCheckIcon, FolderIcon, LayoutDashboardIcon, ListIcon, ChartBarIcon, ArrowRightIcon, PlusIcon, Trash2Icon } from "lucide-react"

const ACCIONES = [
  { label: "Insertar", descripcion: "Añade nuevos registros a cada sección del portfolio", icon: PlusIcon, color: "text-emerald-500 bg-emerald-500/10 ring-emerald-500/20" },
  { label: "Eliminar", descripcion: "Retira registros que ya no quieras mostrar", icon: Trash2Icon, color: "text-rose-500 bg-rose-500/10 ring-rose-500/20" },
]

const SECCIONES = [
  { label: "Cursos", descripcion: "Añadir y eliminar cursos formativos", icon: FolderIcon, ruta: "/admin/Cursos" },
  { label: "Formación", descripcion: "Gestionar estudios y certificaciones", icon: LayoutDashboardIcon, ruta: "/admin/Formacion" },
  { label: "Servicios", descripcion: "Administrar servicios profesionales", icon: ListIcon, ruta: "/admin/Servicios" },
  { label: "Trabajos", descripcion: "Controlar proyectos y trabajos", icon: ChartBarIcon, ruta: "/admin/Trabajos" },
]

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-muted/20 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="relative overflow-hidden rounded-xl border bg-background px-6 py-8 shadow-sm sm:px-8">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-primary/10 to-transparent md:block" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <ShieldCheckIcon className="size-4 text-primary" />
              Panel de administración
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Bienvenido al panel de administración
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
               Desde aquí puedes gestionar todo el contenido de tu portfolio: insertar y eliminar registros de cada sección.
            </p>
          </div>
        </section>

        <section className="rounded-xl border bg-background px-6 py-6 shadow-sm sm:px-8">
          <p className="text-sm text-muted-foreground mb-4">Desde este panel puedes insertar o eliminar el contenido de cada sección del portfolio.</p>
          <div className="grid gap-4 sm:grid-cols-3">
          {ACCIONES.map((a) => (
            <div key={a.label} className="rounded-xl border bg-background p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`rounded-md p-2 ring-1 ${a.color}`}>
                  <a.icon className="size-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">{a.label}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {SECCIONES.map((s) => (
            <Link
              key={s.label}
              to={s.ruta}
              className="flex items-center gap-4 rounded-xl border bg-background p-5 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                <s.icon className="size-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-semibold">{s.label}</h2>
                <p className="text-sm text-muted-foreground">{s.descripcion}</p>
              </div>
              <ArrowRightIcon className="size-5 text-muted-foreground" />
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
