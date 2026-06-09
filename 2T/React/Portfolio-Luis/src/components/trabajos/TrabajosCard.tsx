import type { ITrabajo } from "@/model/interfaces/ITrabajo";
import { TrabajoCard } from "./TrabajoCard";

interface Props {
    trabajos: ITrabajo[];
}

export const TrabajosCard = ({ trabajos }: Props) => {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {trabajos.map((trabajo) => (
                <TrabajoCard key={trabajo.trabajo_id} trabajo={trabajo} />
            ))}
        </div>
    )
}
