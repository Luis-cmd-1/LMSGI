import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { deleteFormacion, getFormaciones } from "@/model/api/backend/apiFormacion"
import type { IFormacion } from "@/model/interfaces/IFormacion"

export function DeleteFormacionForm({ className, ...props }: React.ComponentProps<"div">) {
  const [formaciones, setFormaciones] = useState<IFormacion[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getFormaciones().then((data) => setFormaciones(data ?? []))
  }, [])

  const handleDelete = async () => {
    if (!selectedId) return
    setLoading(true)
    setMessage(null)

    try {
      await deleteFormacion(selectedId)
      setFormaciones((prev) => prev.filter((item) => item.formacion_id !== selectedId))
      setSelectedId("")
      setMessage({ type: "success", text: "Formacion eliminada correctamente" })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ type: "error", text: "Error al eliminar la formacion." })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 items-center", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Eliminar Formacion</h1>
        <p className="text-balance text-muted-foreground">Selecciona la formacion que deseas eliminar.</p>
      </div>

      {message && (
        <div
          className={cn(
            "p-4 rounded-lg text-center font-semibold",
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          )}
        >
          {message.text}
        </div>
      )}

      <Card className="overflow-hidden p-8 w-full max-w-2xl">
        <CardContent className="p-0">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="formacion">Formacion</FieldLabel>
              <select
                id="formacion"
                value={selectedId}
                onChange={(event) => setSelectedId(event.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background"
              >
                <option value="">Selecciona una formacion...</option>
                {formaciones.map((formacion) => (
                  <option key={formacion.formacion_id} value={formacion.formacion_id}>
                    {formacion.titulo} - {formacion.centro}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <Button type="button" variant="destructive" disabled={loading || !selectedId} onClick={handleDelete}>
                {loading ? "Eliminando..." : "Eliminar Formacion"}
              </Button>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  )
}
