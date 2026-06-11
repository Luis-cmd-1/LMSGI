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
import { deleteServicio, getServicios } from "@/model/api/backend/apiServicios"
import type { IServicio } from "@/model/interfaces/IServicio"

export function DeleteServicioForm({ className, ...props }: React.ComponentProps<"div">) {
  const [servicios, setServicios] = useState<IServicio[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    getServicios().then((data) => setServicios(data ?? []))
  }, [])

  const selected = servicios.find(s => s.servicio_id === selectedId) || null

  const handleDelete = async () => {
    if (!selectedId) return
    setLoading(true)
    setMessage(null)
    try {
      await deleteServicio(selectedId)
      setServicios((prev) => prev.filter((item) => item.servicio_id !== selectedId))
      setSelectedId("")
      setConfirmOpen(false)
      setMessage({ type: 'success', text: 'servicio eliminado correctamente' })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al eliminar el/la servicio.' })
      setTimeout(() => setMessage(null), 5000)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 items-center w-full", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Eliminar Servicio</h1>
        <p className="text-balance text-muted-foreground">Selecciona el servicio que deseas eliminar.</p>
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
              <FieldLabel>Servicio</FieldLabel>
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger style={{ width: '100%' }}>
                  <SelectValue placeholder="Selecciona un servicio..." />
                </SelectTrigger>
                <SelectContent>
                  {servicios.map((servicio) => (
                    <SelectItem key={servicio.servicio_id} value={servicio.servicio_id}>
                      <div className="flex flex-col py-0.5">
                        <span className="font-medium">{servicio.nombre}</span>
                        <span className="text-xs text-muted-foreground">{servicio.tipo} — {servicio.precio}</span>
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
                  <span className="text-muted-foreground">Nombre</span>
                  <span className="font-medium">{selected.nombre}</span>
                  <span className="text-muted-foreground">Descripción</span>
                  <span className="font-medium">{selected.descripcion}</span>
                  <span className="text-muted-foreground">Tipo</span>
                  <span className="font-medium">{selected.tipo}</span>
                  <span className="text-muted-foreground">Precio</span>
                  <span className="font-medium">{selected.precio}</span>
                  <span className="text-muted-foreground">Características</span>
                  <span className="font-medium">{selected.caracteristicas}</span>
                  <span className="text-muted-foreground">Icono</span>
                  <span className="font-medium">{selected.icono}</span>
                </div>
              </div>
            )}

            <Field>
              <Button type="button" variant="destructive" disabled={loading || !selectedId} onClick={() => setConfirmOpen(true)} className="w-full transition-all hover:scale-[1.01] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                {loading ? "Eliminando..." : "Eliminar Servicio"}
              </Button>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar "{selected?.nombre}"?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta accion no se puede deshacer. Se eliminara el servicio permanentemente.
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
