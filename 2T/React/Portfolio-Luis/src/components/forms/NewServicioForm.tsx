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
import type { IServicio } from "@/model/interfaces/IServicio";
import { insertServicio } from "@/model/api/backend/apiServicios"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useState } from "react"

export function NewServicioForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit, reset } = useForm<IServicio>()
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<IServicio> = async (data) => {
    setLoading(true)
    setMessage(null)
    try {
      await insertServicio(data)
      setMessage({ type: 'success', text: '✓ Servicio insertado correctamente' })
      reset()
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: 'error', text: '✗ Error al insertar el servicio.' })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 items-center", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Insertar Nuevo Servicio</h1>
        <p className="text-balance text-muted-foreground">
          Completa el formulario con la información del servicio.
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

      <Card className="overflow-hidden p-8 w-full max-w-2xl">
        <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid p-0 md:grid-cols-2">
            <FieldGroup className="gap-4 w-130">
              <Field>
                <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
                <Input id="nombre" type="text" placeholder="Nombre del servicio" required {...register("nombre")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="descripcion">Descripción</FieldLabel>
                <Input id="descripcion" type="text" placeholder="Descripción" required {...register("descripcion")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="tipo">Tipo</FieldLabel>
                <Input id="tipo" type="text" placeholder="Tipo de servicio" required {...register("tipo")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="precio">Precio</FieldLabel>
                <Input id="precio" type="text" placeholder="Precio" required {...register("precio")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="icono">Icono</FieldLabel>
                <Input id="icono" type="text" placeholder="Nombre del icono" required {...register("icono")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="caracteristicas">Características (separadas por coma)</FieldLabel>
                <Input id="caracteristicas" type="text" placeholder="caract1, caract2, caract3" {...register("caracteristicas")} />
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Insertando...' : 'Insertar Servicio'}
                </Button>
              </Field>
            </FieldGroup>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
