import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import type { ICurso } from "@/model/interfaces/ICurso"
import { getCursos, deleteCurso } from "@/model/api/backend/apiCursos"
import { useEffect, useState } from "react"

export function DeleteCursoForm({ className, ...props }: React.ComponentProps<"div">) {
  // Lista de cursos disponibles
  const [cursos, setCursos] = useState<ICurso[]>([])
  // ID del curso seleccionado en el <select>
  const [selectedId, setSelectedId] = useState<string>("")
  // Mensaje de feedback (éxito o error)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  // Controla si la operación de borrado está en curso
    const [loading, setLoading] = useState(false)

  // Al montar el componente, carga los cursos desde la API
  useEffect(() => {
    getCursos().then(setCursos)
  }, [])

  // Elimina el curso seleccionado llamando a la API
  const handleDelete = async () => {
    if (!selectedId) return
    setLoading(true)
    setMessage(null)
    try {
      await deleteCurso(selectedId)
      setMessage({ type: 'success', text: '✓ Curso eliminado correctamente' })
      // Quita el curso eliminado de la lista local
      setCursos(prev => prev.filter(c => c.curso_id !== selectedId))
      setSelectedId("")
      // El mensaje de éxito desaparece tras 5 segundos
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: 'error', text: '✗ Error al eliminar el curso. Intenta nuevamente.' })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 items-center", className)} {...props}>
      {/* Título y descripción del formulario */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Eliminar Curso</h1>
        <p className="text-balance text-muted-foreground">
          Selecciona el curso que deseas eliminar de tu portfolio.
        </p>
      </div>

      {/* Mensaje de feedback según el resultado de la operación */}
      {message && (
        <div className={`p-4 rounded-lg text-center font-semibold ${
          message.type === 'success'
            ? 'bg-green-100 text-green-800 border border-green-300'
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {message.text}
        </div>
      )}

      <Card className="overflow-hidden p-8 w-full max-w-2xl transition-all hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <CardContent className="p-0">
          <FieldGroup className="gap-4">
            {/* Selector de curso a eliminar */}
            <Field>
              <FieldLabel htmlFor="curso">Curso</FieldLabel>
              <select
                id="curso"
                value={selectedId}
                onChange={e => setSelectedId(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background"
              >
                <option value="">Selecciona un curso...</option>
                {cursos.map(curso => (
                  <option key={curso.curso_id} value={curso.curso_id}>
                    {curso.titulo} — {curso.academia}
                  </option>
                ))}
              </select>
            </Field>
            {/* Botón para ejecutar la eliminación */}
            <Field>
              <Button
                type="button"
                variant="destructive"
                disabled={loading || !selectedId}
                onClick={handleDelete}
                className="w-full transition-all hover:scale-[1.01] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]"
              >
                {loading ? 'Eliminando...' : 'Eliminar Curso'}
              </Button>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  )
}