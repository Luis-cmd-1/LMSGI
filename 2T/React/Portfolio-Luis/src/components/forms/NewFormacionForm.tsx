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
import { insertFormacion } from "@/model/api/backend/apiFormacion"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useState } from "react"

export function NewFormacionForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit, reset } = useForm<IFormacion>()
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<IFormacion> = async (data) => {
    setLoading(true)
    setMessage(null)
    try {
      await insertFormacion(data)
      setMessage({ type: 'success', text: '✓ Formación insertada correctamente' })
      reset()
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: 'error', text: '✗ Error al insertar la formación.' })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex w-full flex-col gap-6 items-center", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Insertar Nueva Formación</h1>
        <p className="text-balance text-muted-foreground">
          Completa el formulario con la información de la formación.
        </p>
      </div>

      {message && (
        <div className={`w-full max-w-2xl p-4 rounded-lg text-center font-semibold ${
          message.type === 'success'
            ? 'bg-green-100 text-green-800 border border-green-300'
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {message.text}
        </div>
      )}

      <Card className="w-full max-w-2xl overflow-hidden p-0">
        <form className="w-full p-4 sm:p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-0">
            <FieldGroup className="w-full gap-4">
              <Field>
                <FieldLabel htmlFor="titulo">Título</FieldLabel>
                <Input id="titulo" type="text" placeholder="Título" required {...register("titulo")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="subtitulo">Subtítulo</FieldLabel>
                <Input id="subtitulo" type="text" placeholder="Subtítulo" required {...register("subtitulo")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="descripcion">Descripción</FieldLabel>
                <Input id="descripcion" type="text" placeholder="Descripción" required {...register("descripcion")} />
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
                <FieldLabel htmlFor="categoria">Categoría</FieldLabel>
                <Input id="categoria" type="text" placeholder="Categoría" required {...register("categoria")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="autor_nombre">Autor</FieldLabel>
                <Input id="autor_nombre" type="text" placeholder="Nombre del autor" {...register("autor_nombre")} />
              </Field>
              <Field>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? 'Insertando...' : 'Insertar Formación'}
                </Button>
              </Field>
            </FieldGroup>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
