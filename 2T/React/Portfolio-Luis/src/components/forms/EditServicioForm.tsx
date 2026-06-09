import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { getServicios, updateServicio } from "@/model/api/backend/apiServicios"
import type { IServicio } from "@/model/interfaces/IServicio"

export function EditServicioForm({ className, ...props }: React.ComponentProps<"div">) {
  const { register, handleSubmit, reset } = useForm<IServicio>()
  const [servicios, setServicios] = useState<IServicio[]>([])
  const [seleccionado, setSeleccionado] = useState<IServicio | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingLista, setLoadingLista] = useState(true)

  const cargarServicios = async () => {
    setLoadingLista(true)
    try {
      const data = await getServicios()
      setServicios(data ?? [])
    } finally {
      setLoadingLista(false)
    }
  }

  useEffect(() => {
    cargarServicios()
  }, [])

  const seleccionarServicio = (servicio: IServicio) => {
    setSeleccionado(servicio)
    reset(servicio)
    setMessage(null)
  }

  const cancelarEdicion = () => {
    setSeleccionado(null)
    reset()
  }

  const onSubmit: SubmitHandler<IServicio> = async (data) => {
    if (!seleccionado) return
    setLoading(true)
    setMessage(null)

    try {
      await updateServicio(seleccionado.servicio_id, {
        nombre: data.nombre,
        descripcion: data.descripcion,
        tipo: data.tipo,
        precio: data.precio,
        icono: data.icono,
        caracteristicas: data.caracteristicas,
      })
      setMessage({ type: "success", text: "Servicio actualizado correctamente" })
      setSeleccionado(null)
      reset()
      await cargarServicios()
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: "error", text: "Error al actualizar el servicio." })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-8 items-center w-full", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{seleccionado ? `Editando: ${seleccionado.nombre}` : "Modificar Servicios Existentes"}</h1>
        <p className="text-balance text-muted-foreground max-w-md">Selecciona un servicio de la lista para cargarlo y editarlo.</p>
      </div>

      {message && (
        <div className={cn("p-4 rounded-lg text-center font-semibold w-full max-w-2xl", message.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300")}>
          {message.text}
        </div>
      )}

      {seleccionado && (
        <Card className="overflow-hidden p-8 w-full max-w-2xl border-primary bg-accent/20 transition-all hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid p-0 md:grid-cols-2">
              <FieldGroup className="gap-4 w-130">
                <Field><FieldLabel htmlFor="edit-nombre">Nombre</FieldLabel><Input id="edit-nombre" required {...register("nombre")} /></Field>
                <Field><FieldLabel htmlFor="edit-descripcion">Descripcion</FieldLabel><Input id="edit-descripcion" required {...register("descripcion")} /></Field>
                <Field><FieldLabel htmlFor="edit-tipo">Tipo</FieldLabel><Input id="edit-tipo" required {...register("tipo")} /></Field>
                <Field><FieldLabel htmlFor="edit-precio">Precio</FieldLabel><Input id="edit-precio" required {...register("precio")} /></Field>
                <Field><FieldLabel htmlFor="edit-icono">Icono</FieldLabel><Input id="edit-icono" required {...register("icono")} /></Field>
                <Field><FieldLabel htmlFor="edit-caracteristicas">Caracteristicas</FieldLabel><Input id="edit-caracteristicas" {...register("caracteristicas")} /></Field>

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
        <h2 className="text-xl font-bold mb-4">Servicios Disponibles ({servicios.length})</h2>
        {loadingLista ? (
          <p className="text-center text-muted-foreground p-4">Cargando servicios...</p>
        ) : servicios.length === 0 ? (
          <p className="text-center text-muted-foreground p-4">No se encontraron servicios registrados.</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b text-muted-foreground text-sm font-semibold"><th className="pb-3 pl-2">Nombre</th><th className="pb-3">Tipo</th><th className="pb-3">Precio</th><th className="pb-3 text-center">Acciones</th></tr></thead>
              <tbody className="divide-y text-sm">
                {servicios.map((servicio) => (
                  <tr key={servicio.servicio_id} className="hover:bg-muted/50 transition-colors">
                    <td className="py-3 pl-2 font-medium max-w-[220px] truncate">{servicio.nombre}</td>
                    <td className="py-3 text-muted-foreground">{servicio.tipo}</td>
                    <td className="py-3 text-muted-foreground">{servicio.precio}</td>
                    <td className="py-3 text-center"><Button size="sm" variant={seleccionado?.servicio_id === servicio.servicio_id ? "secondary" : "outline"} onClick={() => seleccionarServicio(servicio)}>Editar</Button></td>
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
