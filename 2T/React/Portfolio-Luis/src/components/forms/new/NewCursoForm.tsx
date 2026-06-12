import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  // CardDescription,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card"
import {
  Field,  
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ICurso } from "@/model/interfaces/ICurso";
import { insertCurso } from "@/model/api/backend/apiCursos"

import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useState } from "react"




export function NewCursoForm({
  className,
  onSuccess,
  ...props
}: React.ComponentProps<"div"> & { onSuccess?: () => void }) {

  
  const { register, handleSubmit, reset, watch, setValue } = useForm<ICurso>()
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<ICurso> = async (data) => {
    setLoading(true)
    setMessage(null)
    try {
      await insertCurso(data)
      setMessage({ type: 'success', text: 'Curso insertado correctamente' })
      setTimeout(() => setMessage(null), 5000)
      reset()
      onSuccess?.()
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al insertar el curso. Intenta nuevamente.' })
      setTimeout(() => setMessage(null), 5000)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={cn("flex w-full flex-col gap-6 items-center", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Insertar Nuevo Curso</h1>
            <p className="text-balance text-muted-foreground">
              Inserta un nuevo curso en tu portfolio personal 
              Completa el formulario con la informacion que deseas agregar.
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
        {/* <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader> */}
        <CardContent className="p-0">
            <FieldGroup className="w-full gap-4">
              <Field>
                <FieldLabel htmlFor="titulo">Titulo</FieldLabel>
                <Input
                  id="titulo"
                  type="text"
                  placeholder="Titulo del curso"
                  required
                  {...register("titulo")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="categoria">Categoria</FieldLabel>
                <Input
                  id="categoria"
                  type="text"
                  placeholder="Categoria del curso"
                  required
                  {...register("categoria")}
                />
              </Field>

              {/* <Field>
                <FieldLabel htmlFor="email">Imagen</FieldLabel>
                <Input
                  id="imagen"
                  type="text"
                  placeholder="URL de la imagen del curso"
                  required
                  {...register("imagen")}
                />
              </Field> */}
              <Field>
                <FieldLabel htmlFor="academia">Academia</FieldLabel>
                <Input
                  id="academia"
                  type="text"
                  placeholder="Academia del curso"
                  required
                  {...register("academia")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="precio">Precio</FieldLabel>
                <Input
                  id="precio"
                  type="number"
                  placeholder="Precio del curso"
                  required
                  {...register("precio", { valueAsNumber: true })}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="estado">Estado</FieldLabel>
                <Select value={watch("estado") ?? ""} onValueChange={(value) => setValue("estado", value ?? "")}>
                  <SelectTrigger style={{ width: '100%' }}>
                    <SelectValue placeholder="Selecciona un estado..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En progreso">En progreso</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Abandonado">Abandonado</SelectItem>
                    <SelectItem value="Certificado">Certificado</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto transition-all hover:scale-[1.01] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                  {loading ? 'Insertando...' : 'Insertar Curso'}
                </Button>
              </Field>
            </FieldGroup>
        </CardContent>
        </form>
      </Card>
    </div>
  )
}
