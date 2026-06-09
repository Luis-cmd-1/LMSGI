import type { IServicio } from "@/model/interfaces/IServicio";
import { ServicioCard } from "./ServicioCard";

interface Props {
    servicios: IServicio[];
}

export const ServiciosCard = ({ servicios }: Props) => {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {servicios.map((servicio) => (
                <ServicioCard key={servicio.servicio_id} servicio={servicio} />
            ))}
        </div>
    )
}
