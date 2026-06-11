import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { getCursos } from "@/model/api/backend/apiCursos"
import type { ICurso } from "@/model/interfaces/ICurso"
import { EditCursoForm } from "./EditCursoForm"

export function SelectCurso({ className, ...props }: React.ComponentProps<"div">) {
  const [cursos, setCursos] = useState<ICurso[]>([])
  const [selectedId, setSelectedId] = useState("")

  useEffect(() => {
    getCursos().then(setCursos)
  }, [])

  const selected = cursos.find(c => c.curso_id === selectedId) || null

  const onSuccess = () => {
    getCursos().then((data) => {
      setCursos(data)
    })
  }

  return (
    <div className={cn("flex flex-col gap-6 items-center w-full", className)} {...props}>
      <Card className="overflow-hidden p-8 w-full max-w-2xl transition-all hover:scale-[1.005] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <CardContent className="p-0">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Curso</FieldLabel>
              <Select value={selectedId} onValueChange={(value) => setSelectedId(value ?? "")}>
                <SelectTrigger style={{ width: '100%' }}>
                  <SelectValue placeholder="Selecciona un curso para editar..." />
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
          </FieldGroup>
        </CardContent>
      </Card>

      {selected && (
        <EditCursoForm key={selected.curso_id} item={selected} onSuccess={onSuccess} />
      )}
    </div>
  )
}
