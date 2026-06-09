import type { IFormacion } from "@/model/interfaces/IFormacion";
import { FormacionCard } from "./FormacionCard";

// Props: recibe un array de formaciones desde Formacion.tsx
interface Props {
    formaciones: IFormacion[];
}

export const FormacionesCard = ({ formaciones }: Props) => {
    return (
        // Cuadrícula responsive: 1 columna en móvil, 2 columnas en escritorio (lg:grid-cols-2)
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {formaciones.map((formacion) => (
                // .map(): recorre el array "formaciones" y por cada elemento
                // crea un componente FormacionCard.
                // key: identificador único para que React sepa qué cambió.
                // formacion: le pasa un objeto individual como prop.
                <FormacionCard key={formacion.formacion_id} formacion={formacion} />
            ))}
        </div>
    )
}
