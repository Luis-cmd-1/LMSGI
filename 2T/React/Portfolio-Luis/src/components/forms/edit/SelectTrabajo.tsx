import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { getTrabajos } from "@/model/api/backend/apiTrabajos"
import type { ITrabajo } from "@/model/interfaces/ITrabajo"
import { EditTrabajoForm } from "./EditTrabajoForm"

export function SelectTrabajo({ className, ...props }: React.ComponentProps<"div">) {
  const [items, setItems] = useState<ITrabajo[]>([])
  const [selectedId, setSelectedId] = useState("")

  useEffect(() => {
    getTrabajos().then((data) => setItems(data ?? []))
  }, [])

  const selected = items.find(i => i.trabajo_id === selectedId) || null

  const onSuccess = () => {
    getTrabajos().then((data) => setItems(data ?? []))
  }

  return (
    <div className={cn("flex flex-col gap-6 items-center w-full", className)} {...props}>
      <Card className="overflow-hidden p-8 w-full max-w-2xl transition-all hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <CardContent className="p-0">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Trabajo</FieldLabel>
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger style={{ width: '100%' }}>
                  <SelectValue placeholder="Selecciona un trabajo para editar..." />
                </SelectTrigger>
                <SelectContent>
                  {items.map(item => (
                    <SelectItem key={item.trabajo_id} value={item.trabajo_id}>
                      <div className="flex flex-col py-0.5">
                        <span className="font-medium">{item.titulo}</span>
                        <span className="text-xs text-muted-foreground">{item.empresa} — {item.fecha}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {selected && (
        <EditTrabajoForm key={selected.trabajo_id} item={selected} onSuccess={onSuccess} />
      )}
    </div>
  )
}
