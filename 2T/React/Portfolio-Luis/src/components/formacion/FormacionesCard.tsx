import type { IFormacion } from "@/model/interfaces/IFormacion";
import { FormacionCard } from "./FormacionCard";

interface Props {
    formaciones: IFormacion[];
}

export const FormacionesCard = ({ formaciones }: Props) => {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {formaciones.map((formacion) => (
                <FormacionCard key={formacion.formacion_id} formacion={formacion} />
            ))}
        </div>
    )
}
