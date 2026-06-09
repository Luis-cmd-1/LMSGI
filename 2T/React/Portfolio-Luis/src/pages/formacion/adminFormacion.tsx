import { DeleteFormacionForm } from "@/components/forms/DeleteFormacionForm"
import { NewFormacionForm } from "@/components/forms/NewFormacionForm"
import { EditFormacionForm } from "@/components/forms/EditFormacionForm"
import { BookOpenIcon, GraduationCapIcon, PencilIcon, PlusIcon, ShieldCheckIcon, Trash2Icon } from "lucide-react"

export default function AdminFormacion() {
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
              <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Gestion de formacion</h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                Crea, elimina y actualiza los estudios, certificaciones y cursos destacados del portfolio.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GraduationCapIcon className="size-5" />
              </div>
              <div>
                <p className="font-medium">Formacion</p>
                <p className="text-xs text-muted-foreground">Contenido academico</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <ResumenCard label="Crear" value="Nueva formacion" icon={PlusIcon} color="text-emerald-500 bg-emerald-500/10 ring-emerald-500/20" />
          <ResumenCard label="Editar" value="Datos existentes" icon={PencilIcon} color="text-sky-500 bg-sky-500/10 ring-sky-500/20" />
          <ResumenCard label="Eliminar" value="Registro seguro" icon={Trash2Icon} color="text-rose-500 bg-rose-500/10 ring-rose-500/20" />
        </section>

        <AdminSection title="Insertar formacion" description="Anade una nueva formacion con centro, estado, fecha y categoria." icon={PlusIcon}>
          <NewFormacionForm />
        </AdminSection>
        <AdminSection title="Eliminar formacion" description="Retira una formacion que ya no quieras mostrar." icon={Trash2Icon}>
          <DeleteFormacionForm />
        </AdminSection>
        <AdminSection title="Modificar formaciones" description="Selecciona una formacion y actualiza sus datos." icon={BookOpenIcon}>
          <EditFormacionForm />
        </AdminSection>
      </div>
    </main>
  )
}

type IconProps = { className?: string }

function ResumenCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ComponentType<IconProps>; color: string }) {
  return (
    <article className="rounded-xl border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <h2 className="mt-1 text-xl font-semibold">{value}</h2>
        </div>
        <div className={`rounded-md p-2 ring-1 ${color}`}>
          <Icon className="size-5" />
        </div>
      </div>
    </article>
  )
}

function AdminSection({ title, description, icon: Icon, children }: { title: string; description: string; icon: React.ComponentType<IconProps>; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border bg-background p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex gap-4 border-b pb-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Administrar</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex justify-center">{children}</div>
    </section>
  )
}
