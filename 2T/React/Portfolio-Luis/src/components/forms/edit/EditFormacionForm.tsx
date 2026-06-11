import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { IFormacion } from "@/model/interfaces/IFormacion";
import { updateFormacion } from "@/model/api/backend/apiFormacion"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useState } from "react"

export function EditFormacionForm({
  item,
  onSuccess,
}: {
  item: IFormacion
  onSuccess?: () => void
}) {
  const { register, handleSubmit } = useForm<IFormacion>({ defaultValues: item })
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<IFormacion> = async (data) => {
    setLoading(true)
    setMessage(null)
    try {
      await updateFormacion(item.formacion_id, data)
      setMessage({ type: 'success', text: 'Formacion actualizada correctamente' })
      setTimeout(() => setMessage(null), 5000)
      onSuccess?.()
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar la formacion.' })
      setTimeout(() => setMessage(null), 5000)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex w-full flex-col gap-6 items-center")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Editar Formacion</h1>
        <p className="text-balance text-muted-foreground">
          Modifica los datos de la formacion seleccionada.
        </p>
      </div>

        {message && (
          <div className={`p-4 rounded-lg text-center font-semibold ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {message.text}
          </div>
        )}
      <Card className="w-full max-w-2xl overflow-hidden p-0 transition-all hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <form className="w-full p-4 sm:p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-0">
            <FieldGroup className="w-full gap-4">
              <Field>
                <FieldLabel htmlFor="titulo">Titulo</FieldLabel>
                <Input id="titulo" type="text" placeholder="Titulo" required {...register("titulo")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="subtitulo">Subtitulo</FieldLabel>
                <Input id="subtitulo" type="text" placeholder="Subtitulo" required {...register("subtitulo")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="descripcion">Descripcion</FieldLabel>
                <Input id="descripcion" type="text" placeholder="Descripcion" required {...register("descripcion")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="centro">Centro</FieldLabel>
                <Input id="centro" type="text" placeholder="Centro" required {...register("centro")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="estado">Estado</FieldLabel>
                <Input id="estado" type="text" placeholder="Estado" required {...register("estado")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="fecha">Fecha</FieldLabel>
                <Input id="fecha" type="text" placeholder="Fecha" required {...register("fecha")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="imagen">Imagen (URL)</FieldLabel>
                <Input id="imagen" type="text" placeholder="URL de la imagen" {...register("imagen")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="categoria">Categoria</FieldLabel>
                <Input id="categoria" type="text" placeholder="Categoria" required {...register("categoria")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="autor_nombre">Autor</FieldLabel>
                <Input id="autor_nombre" type="text" placeholder="Nombre del autor" {...register("autor_nombre")} />
              </Field>
              <Field>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto transition-all hover:scale-[1.01] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </Field>
            </FieldGroup>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
