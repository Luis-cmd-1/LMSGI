import { DeleteCursoForm } from "@/components/forms/DeleteCursoForm"
import { NewCursoForm } from "@/components/forms/NewCursoForm"
import { EditCursoForm } from "@/components/forms/UpdateCursoForm"
import {
  BookOpenIcon,
  GraduationCapIcon,
  PencilIcon,
  PlusIcon,
  ShieldCheckIcon,
  Trash2Icon,
} from "lucide-react"

const resumen = [
  {
    label: "Crear",
    value: "Nuevo curso",
    icon: PlusIcon,
    tone: "text-emerald-500 bg-emerald-500/10 ring-emerald-500/20",
  },
  {
    label: "Editar",
    value: "Datos existentes",
    icon: PencilIcon,
    tone: "text-sky-500 bg-sky-500/10 ring-sky-500/20",
  },
  {
    label: "Eliminar",
    value: "Registro seguro",
    icon: Trash2Icon,
    tone: "text-rose-500 bg-rose-500/10 ring-rose-500/20",
  },
]

export default function AdminCursos() {
  return (
    <main className="min-h-screen bg-muted/20 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="relative overflow-hidden rounded-xl border bg-background px-6 py-8 shadow-sm sm:px-8">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-primary/10 to-transparent md:block" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                <ShieldCheckIcon className="size-4 text-primary" />
                Panel de administracion
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Gestion de cursos
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                Administra los cursos de tu portfolio desde un unico espacio:
                crea nuevos registros, elimina cursos antiguos y actualiza la
                informacion que ya tienes publicada.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GraduationCapIcon className="size-5" />
              </div>
              <div>
                <p className="font-medium">Cursos</p>
                <p className="text-xs text-muted-foreground">Contenido formativo</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {resumen.map((item) => (
            <article
              key={item.label}
              className="rounded-xl border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                  <h2 className="mt-1 text-xl font-semibold">{item.value}</h2>
                </div>
                <div className={`rounded-md p-2 ring-1 ${item.tone}`}>
                  <item.icon className="size-5" />
                </div>
              </div>
            </article>
          ))}
        </section>

        <AdminSection
          eyebrow="Alta de contenido"
          title="Insertar curso"
          description="Anade un curso nuevo indicando titulo, categoria, academia y precio."
          icon={PlusIcon}
        >
          <NewCursoForm />
        </AdminSection>

        <AdminSection
          eyebrow="Mantenimiento"
          title="Eliminar curso"
          description="Selecciona un curso existente y retiralo de la base de datos."
          icon={Trash2Icon}
        >
          <DeleteCursoForm />
        </AdminSection>

        <AdminSection
          eyebrow="Actualizacion"
          title="Modificar cursos"
          description="Busca un curso, carga sus datos y guarda los cambios que necesites."
          icon={BookOpenIcon}
        >
          <EditCursoForm />
        </AdminSection>
      </div>
    </main>
  )
}

type AdminSectionProps = {
  eyebrow: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}

function AdminSection({
  eyebrow,
  title,
  description,
  icon: Icon,
  children,
}: AdminSectionProps) {
  return (
    <section className="rounded-xl border bg-background p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
            <Icon className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">{children}</div>
    </section>
  )
}
