import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { getFormaciones, updateFormacion } from "@/model/api/backend/apiFormacion"
import type { IFormacion } from "@/model/interfaces/IFormacion"

export function EditFormacionForm({ className, ...props }: React.ComponentProps<"div">) {
  const { register, handleSubmit, reset } = useForm<IFormacion>()
  const [formaciones, setFormaciones] = useState<IFormacion[]>([])
  const [seleccionada, setSeleccionada] = useState<IFormacion | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingLista, setLoadingLista] = useState(true)

  const cargarFormaciones = async () => {
    setLoadingLista(true)
    try {
      const data = await getFormaciones()
      setFormaciones(data ?? [])
    } finally {
      setLoadingLista(false)
    }
  }

  useEffect(() => {
    cargarFormaciones()
  }, [])

  const seleccionarFormacion = (formacion: IFormacion) => {
    setSeleccionada(formacion)
    reset(formacion)
    setMessage(null)
  }

  const cancelarEdicion = () => {
    setSeleccionada(null)
    reset()
  }

  const onSubmit: SubmitHandler<IFormacion> = async (data) => {
    if (!seleccionada) return
    setLoading(true)
    setMessage(null)

    try {
      await updateFormacion(seleccionada.formacion_id, {
        titulo: data.titulo,
        subtitulo: data.subtitulo,
        descripcion: data.descripcion,
        centro: data.centro,
        estado: data.estado,
        fecha: data.fecha,
        imagen: data.imagen,
        categoria: data.categoria,
        autor_nombre: data.autor_nombre,
      })
      setMessage({ type: "success", text: "Formacion actualizada correctamente" })
      setSeleccionada(null)
      reset()
      await cargarFormaciones()
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: "error", text: "Error al actualizar la formacion." })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-8 items-center w-full", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {seleccionada ? `Editando: ${seleccionada.titulo}` : "Modificar Formaciones Existentes"}
        </h1>
        <p className="text-balance text-muted-foreground max-w-md">
          Selecciona una formacion de la lista para cargarla y editarla.
        </p>
      </div>

      {message && (
        <div className={cn("p-4 rounded-lg text-center font-semibold w-full max-w-2xl", message.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300")}>
          {message.text}
        </div>
      )}

      {seleccionada && (
        <Card className="overflow-hidden p-8 w-full max-w-2xl border-primary bg-accent/20 transition-all hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid p-0 md:grid-cols-2">
              <FieldGroup className="gap-4 w-130">
                <Field><FieldLabel htmlFor="edit-titulo">Titulo</FieldLabel><Input id="edit-titulo" required {...register("titulo")} /></Field>
                <Field><FieldLabel htmlFor="edit-subtitulo">Subtitulo</FieldLabel><Input id="edit-subtitulo" required {...register("subtitulo")} /></Field>
                <Field><FieldLabel htmlFor="edit-descripcion">Descripcion</FieldLabel><Input id="edit-descripcion" required {...register("descripcion")} /></Field>
                <Field><FieldLabel htmlFor="edit-centro">Centro</FieldLabel><Input id="edit-centro" required {...register("centro")} /></Field>
                <Field><FieldLabel htmlFor="edit-estado">Estado</FieldLabel><Input id="edit-estado" required {...register("estado")} /></Field>
                <Field><FieldLabel htmlFor="edit-fecha">Fecha</FieldLabel><Input id="edit-fecha" required {...register("fecha")} /></Field>
                <Field><FieldLabel htmlFor="edit-imagen">Imagen</FieldLabel><Input id="edit-imagen" {...register("imagen")} /></Field>
                <Field><FieldLabel htmlFor="edit-categoria">Categoria</FieldLabel><Input id="edit-categoria" required {...register("categoria")} /></Field>
                <Field><FieldLabel htmlFor="edit-autor">Autor</FieldLabel><Input id="edit-autor" {...register("autor_nombre")} /></Field>

                <div className="flex gap-4 pt-2">
                  <Button type="submit" className="flex-1 transition-all hover:scale-[1.01] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]" disabled={loading}>{loading ? "Guardando..." : "Guardar Cambios"}</Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={cancelarEdicion}>Cancelar</Button>
                </div>
              </FieldGroup>
            </CardContent>
          </form>
        </Card>
      )}

      <Card className="p-6 w-full max-w-4xl transition-all hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <h2 className="text-xl font-bold mb-4">Formaciones Disponibles ({formaciones.length})</h2>
        {loadingLista ? (
          <p className="text-center text-muted-foreground p-4">Cargando formaciones...</p>
        ) : formaciones.length === 0 ? (
          <p className="text-center text-muted-foreground p-4">No se encontraron formaciones registradas.</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b text-muted-foreground text-sm font-semibold"><th className="pb-3 pl-2">Titulo</th><th className="pb-3">Centro</th><th className="pb-3">Estado</th><th className="pb-3 text-center">Acciones</th></tr></thead>
              <tbody className="divide-y text-sm">
                {formaciones.map((formacion) => (
                  <tr key={formacion.formacion_id} className="hover:bg-muted/50 transition-colors">
                    <td className="py-3 pl-2 font-medium max-w-[220px] truncate">{formacion.titulo}</td>
                    <td className="py-3 text-muted-foreground">{formacion.centro}</td>
                    <td className="py-3 text-muted-foreground">{formacion.estado}</td>
                    <td className="py-3 text-center"><Button size="sm" variant={seleccionada?.formacion_id === formacion.formacion_id ? "secondary" : "outline"} onClick={() => seleccionarFormacion(formacion)}>Editar</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
