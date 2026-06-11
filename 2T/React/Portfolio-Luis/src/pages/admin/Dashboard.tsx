import { Link } from "react-router-dom"
import {
  ShieldCheckIcon, FolderIcon, LayoutDashboardIcon, ListIcon, ChartBarIcon,
  ArrowRightIcon, PlusIcon, SquarePen, Trash2Icon,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/admin/data-table"
import { getCursos, deleteCurso } from "@/model/api/backend/apiCursos"
import { getFormaciones, deleteFormacion } from "@/model/api/backend/apiFormacion"
import { getServicios, deleteServicio } from "@/model/api/backend/apiServicios"
import { getTrabajos, deleteTrabajo } from "@/model/api/backend/apiTrabajos"
import { NewCursoForm } from "@/components/forms/new/NewCursoForm"
import { NewFormacionForm } from "@/components/forms/new/NewFormacionForm"
import { NewServicioForm } from "@/components/forms/new/NewServicioForm"
import { NewTrabajoForm } from "@/components/forms/new/NewTrabajoForm"
import { EditCursoForm } from "@/components/forms/edit/EditCursoForm"
import { EditFormacionForm } from "@/components/forms/edit/EditFormacionForm"
import { EditServicioForm } from "@/components/forms/edit/EditServicioForm"
import { EditTrabajoForm } from "@/components/forms/edit/EditTrabajoForm"

const ACCIONES = [
  { label: "Insertar", descripcion: "Añade nuevos registros a cada sección del portfolio", icon: PlusIcon, color: "text-emerald-500 bg-emerald-500/10 ring-emerald-500/20" },
  { label: "Editar", descripcion: "Modifica los registros seleccionados", icon: SquarePen, color: "text-blue-500 bg-blue-500/10 ring-blue-500/20" },
  { label: "Eliminar", descripcion: "Retira registros que ya no quieras mostrar", icon: Trash2Icon, color: "text-rose-500 bg-rose-500/10 ring-rose-500/20" },
]

const SECCIONES_TAB = {
  cursos: { label: "Cursos", api: getCursos, deleteApi: deleteCurso, EditFormComponent: EditCursoForm, InsertFormComponent: NewCursoForm, getId: (i: any) => i.curso_id, fields: ["titulo", "categoria", "academia", "precio"] },
  formacion: { label: "Formación", api: getFormaciones, deleteApi: deleteFormacion, EditFormComponent: EditFormacionForm, InsertFormComponent: NewFormacionForm, getId: (i: any) => i.formacion_id, fields: ["titulo", "subtitulo", "descripcion", "centro", "estado", "fecha", "imagen", "categoria", "autor_nombre"] },
  servicios: { label: "Servicios", api: getServicios, deleteApi: deleteServicio, EditFormComponent: EditServicioForm, InsertFormComponent: NewServicioForm, getId: (i: any) => i.servicio_id, fields: ["nombre", "descripcion", "tipo", "precio", "caracteristicas", "icono"] },
  trabajos: { label: "Trabajos", api: getTrabajos, deleteApi: deleteTrabajo, EditFormComponent: EditTrabajoForm, InsertFormComponent: NewTrabajoForm, getId: (i: any) => i.trabajo_id, fields: ["titulo", "descripcion", "empresa", "fecha", "tecnologias", "enlace", "imagen"] },
}

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
               Desde aquí puedes gestionar todo el contenido de tu portfolio: insertar, editar y eliminar registros de cada sección.
            </p>
          </div>
        </section>

        <section className="rounded-xl border bg-background px-6 py-6 shadow-sm sm:px-8">
          <p className="text-sm text-muted-foreground mb-4">Desde este panel puedes insertar, editar o eliminar el contenido de cada sección del portfolio.</p>
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

        <section className="rounded-xl border bg-background px-6 py-6 shadow-sm sm:px-8">
          <Tabs defaultValue="cursos">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Listado de contenido</h2>
              <TabsList className="overflow-x-auto">
                {Object.entries(SECCIONES_TAB).map(([key, tab]) => (
                  <TabsTrigger key={key} value={key}>{tab.label}</TabsTrigger>
                ))}
              </TabsList>
            </div>
            {Object.entries(SECCIONES_TAB).map(([key, tab]) => (
              <TabsContent key={key} value={key}>
                <DataTable
                  api={tab.api}
                  deleteApi={tab.deleteApi}
                  EditFormComponent={tab.EditFormComponent}
                  InsertFormComponent={tab.InsertFormComponent}
                  getId={tab.getId}
                  fields={tab.fields}
                  label={tab.label}
                />
              </TabsContent>
            ))}
          </Tabs>
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
