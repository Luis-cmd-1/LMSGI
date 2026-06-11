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
import { deleteFormacion, getFormaciones } from "@/model/api/backend/apiFormacion"
import type { IFormacion } from "@/model/interfaces/IFormacion"

export function DeleteFormacionForm({ className, ...props }: React.ComponentProps<"div">) {
  const [formaciones, setFormaciones] = useState<IFormacion[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    getFormaciones().then((data) => setFormaciones(data ?? []))
  }, [])

  const selected = formaciones.find(f => f.formacion_id === selectedId) || null

  const handleDelete = async () => {
    if (!selectedId) return
    setLoading(true)
    setMessage(null)
    try {
      await deleteFormacion(selectedId)
      setFormaciones((prev) => prev.filter((item) => item.formacion_id !== selectedId))
      setSelectedId("")
      setConfirmOpen(false)
      setMessage({ type: 'success', text: 'Formacion eliminada correctamente' })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al eliminar la formacion.' })
      setTimeout(() => setMessage(null), 5000)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 items-center w-full", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Eliminar Formacion</h1>
        <p className="text-balance text-muted-foreground">Selecciona la formacion que deseas eliminar.</p>
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
              <FieldLabel>Formacion</FieldLabel>
              <Select value={selectedId} onValueChange={(value) => setSelectedId(value ?? "")}>
                <SelectTrigger style={{ width: '100%' }}>
                  <SelectValue placeholder="Selecciona una formacion..." />
                </SelectTrigger>
                <SelectContent>
                  {formaciones.map((formacion) => (
                    <SelectItem key={formacion.formacion_id} value={formacion.formacion_id}>
                      <div className="flex flex-col py-0.5">
                        <span className="font-medium">{formacion.titulo}</span>
                        <span className="text-xs text-muted-foreground">{formacion.centro} — {formacion.estado} — {formacion.fecha}</span>
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
                  <span className="text-muted-foreground">Subtítulo</span>
                  <span className="font-medium">{selected.subtitulo}</span>
                  <span className="text-muted-foreground">Descripción</span>
                  <span className="font-medium">{selected.descripcion}</span>
                  <span className="text-muted-foreground">Centro</span>
                  <span className="font-medium">{selected.centro}</span>
                  <span className="text-muted-foreground">Estado</span>
                  <span className="font-medium">{selected.estado}</span>
                  <span className="text-muted-foreground">Fecha</span>
                  <span className="font-medium">{selected.fecha}</span>
                  <span className="text-muted-foreground">Categoría</span>
                  <span className="font-medium">{selected.categoria}</span>
                  <span className="text-muted-foreground">Autor</span>
                  <span className="font-medium">{selected.autor_nombre}</span>
                  <span className="text-muted-foreground">Imagen</span>
                  <span className="font-medium truncate">{selected.imagen}</span>
                </div>
              </div>
            )}

            <Field>
              <Button type="button" variant="destructive" disabled={loading || !selectedId} onClick={() => setConfirmOpen(true)} className="w-full transition-all hover:scale-[1.01] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                {loading ? "Eliminando..." : "Eliminar Formacion"}
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
              Esta accion no se puede deshacer. Se eliminara la formacion permanentemente.
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
