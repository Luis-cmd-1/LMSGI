import { useEffect, useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { deleteCurso, getCursos } from "@/model/api/backend/apiCursos"
import type { ICurso } from "@/model/interfaces/ICurso"

export function DeleteCursoForm({ className, ...props }: React.ComponentProps<"div">) {
  const [cursos, setCursos] = useState<ICurso[]>([])
  const [selectedId, setSelectedId] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    getCursos().then(setCursos)
  }, [])

  const selected = cursos.find(c => c.curso_id === selectedId) || null

  const handleDelete = async () => {
    if (!selectedId) return
    setLoading(true)
    setMessage(null)
    try {
      await deleteCurso(selectedId)
      setMessage({ type: 'success', text: 'Curso eliminado correctamente' })
      setTimeout(() => setMessage(null), 5000)
      setCursos(prev => prev.filter(c => c.curso_id !== selectedId))
      setSelectedId("")
      setConfirmOpen(false)
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al eliminar el curso.' })
      setTimeout(() => setMessage(null), 5000)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 items-center w-full", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Eliminar Curso</h1>
        <p className="text-balance text-muted-foreground">
          Selecciona el curso que deseas eliminar de tu portfolio.
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
      <Card className="overflow-hidden p-8 w-full max-w-2xl transition-all hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <CardContent className="p-0">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Curso</FieldLabel>
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger style={{ width: '100%' }}>
                  <SelectValue placeholder="Selecciona un curso..." />
                </SelectTrigger>
                <SelectContent>
                  {cursos.map(curso => (
                    <SelectItem key={curso.curso_id} value={curso.curso_id}>
                      <div className="flex flex-col py-0.5">
                        <span className="font-medium">{curso.titulo}</span>
                        <span className="text-xs text-muted-foreground">{curso.academia} — {curso.categoria} — {curso.precio}€</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {selected && (
              <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Vista previa</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  <span className="text-muted-foreground">Título</span>
                  <span className="font-medium">{selected.titulo}</span>
                  <span className="text-muted-foreground">Categoría</span>
                  <span className="font-medium">{selected.categoria}</span>
                  <span className="text-muted-foreground">Academia</span>
                  <span className="font-medium">{selected.academia}</span>
                  <span className="text-muted-foreground">Precio</span>
                  <span className="font-medium">{selected.precio}€</span>
                </div>
              </div>
            )}

            <Field>
              <Button
                type="button"
                variant="destructive"
                disabled={loading || !selectedId}
                onClick={() => setConfirmOpen(true)}
                className="w-full transition-all hover:scale-[1.01] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]"
              >
                {loading ? 'Eliminando...' : 'Eliminar Curso'}
              </Button>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar "{selected?.titulo}"?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta accion no se puede deshacer. Se eliminara el curso permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
