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
import type { ITrabajo } from "@/model/interfaces/ITrabajo";
import { insertTrabajo } from "@/model/api/backend/apiTrabajos"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useState } from "react"

export function NewTrabajoForm({
  className,
  onSuccess,
  ...props
}: React.ComponentProps<"div"> & { onSuccess?: () => void }) {
  const { register, handleSubmit, reset } = useForm<ITrabajo>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const onSubmit: SubmitHandler<ITrabajo> = async (data) => {
    setLoading(true)
    setMessage(null)
    try {
      await insertTrabajo(data)
      setMessage({ type: 'success', text: 'Trabajo insertado correctamente' })
      setTimeout(() => setMessage(null), 5000)
      reset()
      reset()
      onSuccess?.()
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al insertar el trabajo.' })
      setTimeout(() => setMessage(null), 5000)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex w-full flex-col gap-6 items-center", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Insertar Nuevo Trabajo</h1>
        <p className="text-balance text-muted-foreground">
          Completa el formulario con la información del trabajo.
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
                <FieldLabel htmlFor="titulo">Título</FieldLabel>
                <Input id="titulo" type="text" placeholder="Título del trabajo" required {...register("titulo")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="descripcion">Descripción</FieldLabel>
                <Input id="descripcion" type="text" placeholder="Descripción" required {...register("descripcion")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="empresa">Empresa</FieldLabel>
                <Input id="empresa" type="text" placeholder="Empresa" required {...register("empresa")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="fecha">Fecha</FieldLabel>
                <Input id="fecha" type="text" placeholder="Fecha" required {...register("fecha")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="enlace">Enlace</FieldLabel>
                <Input id="enlace" type="text" placeholder="URL del proyecto" {...register("enlace")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="imagen">Imagen (URL)</FieldLabel>
                <Input id="imagen" type="text" placeholder="URL de la imagen" {...register("imagen")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="tecnologias">Tecnologías (separadas por coma)</FieldLabel>
                <Input id="tecnologias" type="text" placeholder="React, Node.js, TypeScript" {...register("tecnologias")} />
              </Field>
              <Field>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto transition-all hover:scale-[1.01] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                  {loading ? 'Insertando...' : 'Insertar Trabajo'}
                </Button>
              </Field>
            </FieldGroup>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
