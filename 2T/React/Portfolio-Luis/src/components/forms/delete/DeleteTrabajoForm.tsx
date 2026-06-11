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
import { deleteTrabajo, getTrabajos } from "@/model/api/backend/apiTrabajos"
import type { ITrabajo } from "@/model/interfaces/ITrabajo"

export function DeleteTrabajoForm({ className, ...props }: React.ComponentProps<"div">) {
  const [trabajos, setTrabajos] = useState<ITrabajo[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    getTrabajos().then((data) => setTrabajos(data ?? []))
  }, [])

  const selected = trabajos.find(t => t.trabajo_id === selectedId) || null

  const handleDelete = async () => {
    if (!selectedId) return
    setLoading(true)
    setMessage(null)
    try {
      await deleteTrabajo(selectedId)
      setTrabajos((prev) => prev.filter((item) => item.trabajo_id !== selectedId))
      setSelectedId("")
      setConfirmOpen(false)
      setMessage({ type: 'success', text: 'trabajo eliminado correctamente' })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al eliminar el/la trabajo.' })
      setTimeout(() => setMessage(null), 5000)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 items-center w-full", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Eliminar Trabajo</h1>
        <p className="text-balance text-muted-foreground">Selecciona el trabajo que deseas eliminar.</p>
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
              <FieldLabel>Trabajo</FieldLabel>
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger style={{ width: '100%' }}>
                  <SelectValue placeholder="Selecciona un trabajo..." />
                </SelectTrigger>
                <SelectContent>
                  {trabajos.map((trabajo) => (
                    <SelectItem key={trabajo.trabajo_id} value={trabajo.trabajo_id}>
                      <div className="flex flex-col py-0.5">
                        <span className="font-medium">{trabajo.titulo}</span>
                        <span className="text-xs text-muted-foreground">{trabajo.empresa} — {trabajo.fecha}</span>
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
                  <span className="text-muted-foreground">Descripción</span>
                  <span className="font-medium">{selected.descripcion}</span>
                  <span className="text-muted-foreground">Empresa</span>
                  <span className="font-medium">{selected.empresa}</span>
                  <span className="text-muted-foreground">Fecha</span>
                  <span className="font-medium">{selected.fecha}</span>
                  <span className="text-muted-foreground">Tecnologías</span>
                  <span className="font-medium">{selected.tecnologias}</span>
                  <span className="text-muted-foreground">Enlace</span>
                  <span className="font-medium truncate">{selected.enlace}</span>
                  <span className="text-muted-foreground">Imagen</span>
                  <span className="font-medium truncate">{selected.imagen}</span>
                </div>
              </div>
            )}

            <Field>
              <Button type="button" variant="destructive" disabled={loading || !selectedId} onClick={() => setConfirmOpen(true)} className="w-full transition-all hover:scale-[1.01] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                {loading ? "Eliminando..." : "Eliminar Trabajo"}
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
              Esta accion no se puede deshacer. Se eliminara el trabajo permanentemente.
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
