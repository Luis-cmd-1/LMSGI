import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { getFormaciones } from "@/model/api/backend/apiFormacion"
import type { IFormacion } from "@/model/interfaces/IFormacion"
import { EditFormacionForm } from "./EditFormacionForm"

export function SelectFormacion({ className, ...props }: React.ComponentProps<"div">) {
  const [items, setItems] = useState<IFormacion[]>([])
  const [selectedId, setSelectedId] = useState("")

  useEffect(() => {
    getFormaciones().then((data) => setItems(data ?? []))
  }, [])

  const selected = items.find(i => i.formacion_id === selectedId) || null

  const onSuccess = () => {
    getFormaciones().then((data) => setItems(data ?? []))
  }

  return (
    <div className={cn("flex flex-col gap-6 items-center w-full", className)} {...props}>
      <Card className="overflow-hidden p-8 w-full max-w-2xl transition-all hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <CardContent className="p-0">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Formacion</FieldLabel>
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger style={{ width: '100%' }}>
                  <SelectValue placeholder="Selecciona una formacion para editar..." />
                </SelectTrigger>
                <SelectContent>
                  {items.map(item => (
                    <SelectItem key={item.formacion_id} value={item.formacion_id}>
                      <div className="flex flex-col py-0.5">
                        <span className="font-medium">{item.titulo}</span>
                        <span className="text-xs text-muted-foreground">{item.centro} — {item.estado} — {item.fecha}</span>
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
        <EditFormacionForm key={selected.formacion_id} item={selected} onSuccess={onSuccess} />
      )}
    </div>
  )
}
