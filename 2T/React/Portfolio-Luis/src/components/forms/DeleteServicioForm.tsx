import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { deleteServicio, getServicios } from "@/model/api/backend/apiServicios"
import type { IServicio } from "@/model/interfaces/IServicio"

export function DeleteServicioForm({ className, ...props }: React.ComponentProps<"div">) {
  const [servicios, setServicios] = useState<IServicio[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getServicios().then((data) => setServicios(data ?? []))
  }, [])

  const handleDelete = async () => {
    if (!selectedId) return
    setLoading(true)
    setMessage(null)
    try {
      await deleteServicio(selectedId)
      setServicios((prev) => prev.filter((item) => item.servicio_id !== selectedId))
      setSelectedId("")
      setMessage({ type: "success", text: "Servicio eliminado correctamente" })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: "error", text: "Error al eliminar el servicio." })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 items-center", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Eliminar Servicio</h1>
        <p className="text-balance text-muted-foreground">Selecciona el servicio que deseas eliminar.</p>
      </div>

      {message && (
        <div className={cn("p-4 rounded-lg text-center font-semibold", message.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300")}>
          {message.text}
        </div>
      )}

      <Card className="overflow-hidden p-8 w-full max-w-2xl transition-all hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <CardContent className="p-0">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="servicio">Servicio</FieldLabel>
              <select id="servicio" value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className="w-full border rounded-md px-3 py-2 text-sm bg-background">
                <option value="">Selecciona un servicio...</option>
                {servicios.map((servicio) => (
                  <option key={servicio.servicio_id} value={servicio.servicio_id}>{servicio.nombre} - {servicio.tipo}</option>
                ))}
              </select>
            </Field>
            <Field>
              <Button type="button" variant="destructive" disabled={loading || !selectedId} onClick={handleDelete} className="transition-all hover:scale-[1.01] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                {loading ? "Eliminando..." : "Eliminar Servicio"}
              </Button>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  )
}
