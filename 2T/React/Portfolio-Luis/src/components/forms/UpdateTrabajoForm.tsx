import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { getTrabajos, updateTrabajo } from "@/model/api/backend/apiTrabajos"
import type { ITrabajo } from "@/model/interfaces/ITrabajo"

type TrabajoForm = Omit<ITrabajo, "tecnologias"> & {
  tecnologias: string
}

export function EditTrabajoForm({ className, ...props }: React.ComponentProps<"div">) {
  const { register, handleSubmit, reset } = useForm<TrabajoForm>()
  const [trabajos, setTrabajos] = useState<ITrabajo[]>([])
  const [seleccionado, setSeleccionado] = useState<ITrabajo | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingLista, setLoadingLista] = useState(true)

  const cargarTrabajos = async () => {
    setLoadingLista(true)
    try {
      const data = await getTrabajos()
      setTrabajos(data ?? [])
    } finally {
      setLoadingLista(false)
    }
  }

  useEffect(() => {
    cargarTrabajos()
  }, [])

  const seleccionarTrabajo = (trabajo: ITrabajo) => {
    setSeleccionado(trabajo)
    reset({
      ...trabajo,
      tecnologias: Array.isArray(trabajo.tecnologias) ? trabajo.tecnologias.join(", ") : "",
    })
    setMessage(null)
  }

  const cancelarEdicion = () => {
    setSeleccionado(null)
    reset()
  }

  const onSubmit: SubmitHandler<TrabajoForm> = async (data) => {
    if (!seleccionado) return
    setLoading(true)
    setMessage(null)

    try {
      await updateTrabajo(seleccionado.trabajo_id, {
        titulo: data.titulo,
        descripcion: data.descripcion,
        empresa: data.empresa,
        fecha: data.fecha,
        enlace: data.enlace,
        imagen: data.imagen,
        tecnologias: data.tecnologias.split(",").map((item) => item.trim()).filter(Boolean),
      })
      setMessage({ type: "success", text: "Trabajo actualizado correctamente" })
      setSeleccionado(null)
      reset()
      await cargarTrabajos()
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: "error", text: "Error al actualizar el trabajo." })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-8 items-center w-full", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{seleccionado ? `Editando: ${seleccionado.titulo}` : "Modificar Trabajos Existentes"}</h1>
        <p className="text-balance text-muted-foreground max-w-md">Selecciona un trabajo de la lista para cargarlo y editarlo.</p>
      </div>

      {message && (
        <div className={cn("p-4 rounded-lg text-center font-semibold w-full max-w-2xl", message.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300")}>
          {message.text}
        </div>
      )}

      {seleccionado && (
        <Card className="overflow-hidden p-8 w-full max-w-2xl border-primary bg-accent/20">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid p-0 md:grid-cols-2">
              <FieldGroup className="gap-4 w-130">
                <Field><FieldLabel htmlFor="edit-titulo">Titulo</FieldLabel><Input id="edit-titulo" required {...register("titulo")} /></Field>
                <Field><FieldLabel htmlFor="edit-descripcion">Descripcion</FieldLabel><Input id="edit-descripcion" required {...register("descripcion")} /></Field>
                <Field><FieldLabel htmlFor="edit-empresa">Empresa</FieldLabel><Input id="edit-empresa" required {...register("empresa")} /></Field>
                <Field><FieldLabel htmlFor="edit-fecha">Fecha</FieldLabel><Input id="edit-fecha" required {...register("fecha")} /></Field>
                <Field><FieldLabel htmlFor="edit-enlace">Enlace</FieldLabel><Input id="edit-enlace" {...register("enlace")} /></Field>
                <Field><FieldLabel htmlFor="edit-imagen">Imagen</FieldLabel><Input id="edit-imagen" {...register("imagen")} /></Field>
                <Field><FieldLabel htmlFor="edit-tecnologias">Tecnologias</FieldLabel><Input id="edit-tecnologias" placeholder="React, TypeScript" {...register("tecnologias")} /></Field>

                <div className="flex gap-4 pt-2">
                  <Button type="submit" className="flex-1" disabled={loading}>{loading ? "Guardando..." : "Guardar Cambios"}</Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={cancelarEdicion}>Cancelar</Button>
                </div>
              </FieldGroup>
            </CardContent>
          </form>
        </Card>
      )}

      <Card className="p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Trabajos Disponibles ({trabajos.length})</h2>
        {loadingLista ? (
          <p className="text-center text-muted-foreground p-4">Cargando trabajos...</p>
        ) : trabajos.length === 0 ? (
          <p className="text-center text-muted-foreground p-4">No se encontraron trabajos registrados.</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b text-muted-foreground text-sm font-semibold"><th className="pb-3 pl-2">Titulo</th><th className="pb-3">Empresa</th><th className="pb-3">Fecha</th><th className="pb-3 text-center">Acciones</th></tr></thead>
              <tbody className="divide-y text-sm">
                {trabajos.map((trabajo) => (
                  <tr key={trabajo.trabajo_id} className="hover:bg-muted/50 transition-colors">
                    <td className="py-3 pl-2 font-medium max-w-[220px] truncate">{trabajo.titulo}</td>
                    <td className="py-3 text-muted-foreground">{trabajo.empresa}</td>
                    <td className="py-3 text-muted-foreground">{trabajo.fecha}</td>
                    <td className="py-3 text-center"><Button size="sm" variant={seleccionado?.trabajo_id === trabajo.trabajo_id ? "secondary" : "outline"} onClick={() => seleccionarTrabajo(trabajo)}>Editar</Button></td>
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
