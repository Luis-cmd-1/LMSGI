import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { getServicios } from "@/model/api/backend/apiServicios"
import type { IServicio } from "@/model/interfaces/IServicio"
import { EditServicioForm } from "./EditServicioForm"

export function SelectServicio({ className, ...props }: React.ComponentProps<"div">) {
  const [items, setItems] = useState<IServicio[]>([])
  const [selectedId, setSelectedId] = useState("")

  useEffect(() => {
    getServicios().then((data) => setItems(data ?? []))
  }, [])

  const selected = items.find(i => i.servicio_id === selectedId) || null

  const onSuccess = () => {
    getServicios().then((data) => setItems(data ?? []))
  }

  return (
    <div className={cn("flex flex-col gap-6 items-center w-full", className)} {...props}>
      <Card className="overflow-hidden p-8 w-full max-w-2xl transition-all hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <CardContent className="p-0">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Servicio</FieldLabel>
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger style={{ width: '100%' }}>
                  <SelectValue placeholder="Selecciona un servicio para editar..." />
                </SelectTrigger>
                <SelectContent>
                  {items.map(item => (
                    <SelectItem key={item.servicio_id} value={item.servicio_id}>
                      <div className="flex flex-col py-0.5">
                        <span className="font-medium">{item.nombre}</span>
                        <span className="text-xs text-muted-foreground">{item.tipo} — {item.precio}</span>
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
        <EditServicioForm key={selected.servicio_id} item={selected} onSuccess={onSuccess} />
      )}
    </div>
  )
}
