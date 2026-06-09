"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { ICurso } from "@/model/interfaces/ICurso"
import { getCursos, updateCurso } from "@/model/api/backend/apiCursos" // Ajusta la ruta exacta a tu API

import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useState, useEffect } from "react"

export function EditCursoForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
  const { register, handleSubmit, setValue, reset } = useForm<ICurso>()
  const [cursos, setCursos] = useState<ICurso[]>([])
  const [cursoSeleccionado, setCursoSeleccionado] = useState<ICurso | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingLista, setLoadingLista] = useState(true)

  // 1. Cargar lista de cursos de Supabase
  const cargarCursos = async () => {
    setLoadingLista(true)
    try {
      const data = await getCursos()
      if (data) setCursos(data)
    } catch (error) {
      console.error("Error cargando cursos:", error)
    } finally {
      setLoadingLista(false)
    }
  }

  useEffect(() => {
    cargarCursos()
  }, [])

  // 2. Al hacer clic en Editar, mapear datos al formulario
  const seleccionarCurso = (curso: ICurso) => {
    setCursoSeleccionado(curso)
    setValue("curso_id", curso.curso_id)
    setValue("titulo", curso.titulo)
    setValue("categoria", curso.categoria)
    setValue("academia", curso.academia)
    setValue("precio", curso.precio)
    setMessage(null)
  }

  // 3. Cancelar la edición actual
  const cancelarEdicion = () => {
    setCursoSeleccionado(null)
    reset()
  }

  // 4. Enviar datos actualizados a Supabase
  const onSubmit: SubmitHandler<ICurso> = async (data) => {
    if (!cursoSeleccionado) return
    setLoading(true)
    setMessage(null)
    
    try {
      // Separamos el ID de los datos que se actualizan
      const { curso_id, ...camposActualizados } = data
      
      await updateCurso(cursoSeleccionado.curso_id, camposActualizados)
      setMessage({ type: 'success', text: '✓ Curso actualizado correctamente' })
      
      // Limpiar formulario y refrescar listado
      setCursoSeleccionado(null)
      reset()
      cargarCursos()
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: 'error', text: '✗ Error al actualizar el curso. Intenta nuevamente.' })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-8 items-center w-full", className)} {...props}>
      {/* Cabecera dinámica */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {cursoSeleccionado ? `Editando: ${cursoSeleccionado.titulo}` : 'Modificar Cursos Existentes'}
        </h1>
        <p className="text-balance text-muted-foreground max-w-md">
          {cursoSeleccionado 
            ? "Modifica la información en los campos de abajo y guarda los cambios correspondientes." 
            : "Selecciona cualquier curso de la lista inferior para cargar sus datos y editarlos de forma segura."}
        </p>
      </div>

      {/* Mensajes de Feedback de API */}
      {message && (
        <div className={`p-4 rounded-lg text-center font-semibold w-full max-w-2xl ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-300' 
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {message.text}
        </div>
      )}

      {/* Formulario de Edición (Oculto si no hay selección) */}
      {cursoSeleccionado && (
        <Card className="overflow-hidden p-8 w-full max-w-2xl border-primary bg-accent/20 animate-in fade-in-50 duration-200">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid p-0 md:grid-cols-2">
              <FieldGroup className="gap-4 w-130">
                <Field>
                  <FieldLabel htmlFor="edit-titulo">Titulo</FieldLabel>
                  <Input
                    id="edit-titulo"
                    type="text"
                    placeholder="Titulo del curso"
                    required
                    {...register("titulo")}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="edit-categoria">Categoria</FieldLabel>
                  <Input
                    id="edit-categoria"
                    type="text"
                    placeholder="Categoria del curso"
                    required
                    {...register("categoria")}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="edit-academia">Academia</FieldLabel>
                  <Input
                    id="edit-academia"
                    type="text"
                    placeholder="Academia del curso"
                    required
                    {...register("academia")}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="edit-precio">Precio</FieldLabel>
                  <Input
                    id="edit-precio"
                    type="number"
                    placeholder="Precio del curso"
                    required
                    {...register("precio", { valueAsNumber: true })}
                  />
                </Field>
                
                <div className="flex gap-4 pt-2">
                  <Button type="submit" variant="default" className="flex-1" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={cancelarEdicion}>
                    Cancelar
                  </Button>
                </div>
              </FieldGroup>
            </CardContent>
          </form>
        </Card>
      )}

      {/* Tabla del listado disponible */}
      <Card className="p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Cursos Disponibles ({cursos.length})</h2>
        {loadingLista ? (
          <p className="text-center text-muted-foreground p-4">Cargando portafolio de cursos...</p>
        ) : cursos.length === 0 ? (
          <p className="text-center text-muted-foreground p-4">No se encontraron cursos registrados.</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-muted-foreground text-sm font-semibold">
                  <th className="pb-3 pl-2">Título</th>
                  <th className="pb-3">Categoría</th>
                  <th className="pb-3">Academia</th>
                  <th className="pb-3 text-right">Precio</th>
                  <th className="pb-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {cursos.map((curso) => (
                  <tr key={curso.curso_id} className="hover:bg-muted/50 transition-colors">
                    <td className="py-3 pl-2 font-medium max-w-[200px] truncate">{curso.titulo}</td>
                    <td className="py-3 text-muted-foreground">{curso.categoria}</td>
                    <td className="py-3 text-muted-foreground">{curso.academia}</td>
                    <td className="py-3 text-right font-semibold">{curso.precio}€</td>
                    <td className="py-3 text-center">
                      <Button 
                        size="sm"
                        variant={cursoSeleccionado?.curso_id === curso.curso_id ? "secondary" : "outline"}
                        onClick={() => seleccionarCurso(curso)}
                      >
                        Editar
                      </Button>
                    </td>
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
