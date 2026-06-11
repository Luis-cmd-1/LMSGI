import { DeleteCursoForm } from "@/components/forms/delete/DeleteCursoForm"
import { SelectCurso } from "@/components/forms/edit/SelectCurso"
import { NewCursoForm } from "@/components/forms/new/NewCursoForm"
import {
  GraduationCapIcon,
  PlusIcon,
  ShieldCheckIcon,
  SquarePen,
  Trash2Icon,
} from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

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
                crea nuevos registros y elimina cursos antiguos.
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

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="crear-curso" className="rounded-xl border bg-background shadow-sm transition-all hover:scale-[1.005] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
            <AccordionTrigger className="px-5 sm:px-6 py-5 sm:py-6 hover:no-underline">
              <div className="flex w-full gap-4 text-left">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20">
                  <PlusIcon className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Alta de contenido</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight">Insertar curso</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Anade un curso nuevo indicando titulo, categoria, academia y precio.</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 sm:px-6 pb-5 sm:pb-6">
              <div className="flex justify-center border-t pt-5">
                <NewCursoForm />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="editar-curso" className="rounded-xl border bg-background shadow-sm transition-all hover:scale-[1.005] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            <AccordionTrigger className="px-5 sm:px-6 py-5 sm:py-6 hover:no-underline">
              <div className="flex w-full gap-4 text-left">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20">
                  <SquarePen className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Modificacion de contenido</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight">Editar curso</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Selecciona un curso y actualiza sus campos.</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 sm:px-6 pb-5 sm:pb-6">
              <div className="border-t pt-5">
                <SelectCurso />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="eliminar-curso" className="rounded-xl border bg-background shadow-sm transition-all hover:scale-[1.005] hover:shadow-[0_0_30px_rgba(244,63,94,0.4)]">
            <AccordionTrigger className="px-5 sm:px-6 py-5 sm:py-6 hover:no-underline">
              <div className="flex w-full gap-4 text-left">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20">
                  <Trash2Icon className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Mantenimiento</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight">Eliminar curso</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Selecciona un curso existente y retiralo de la base de datos.</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 sm:px-6 pb-5 sm:pb-6">
              <div className="flex justify-center border-t pt-5">
                <DeleteCursoForm />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  )
}
