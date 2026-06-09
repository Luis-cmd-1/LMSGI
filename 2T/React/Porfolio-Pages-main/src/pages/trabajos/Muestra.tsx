import { Estilos } from "./Estilos";
import type { IServicios } from "@/model/interfaces/IServicios";

// Definicion de propiedades de entrada
interface Props {
    servicios: IServicios[];
}
export const Muestra = ({servicios}: Props ) => {
    // Muesta el listado de cartas (La informacion de los servicions)
    return(
        // 1 grid Activarlo
        // 2 Grap-6 espacion entre targetas
        // 3 sm:grid-cols-2 en pantallas pequeñas
        // 4 lg:grid-col-3 en pantallas gradnes
        // 5 bg-slate-950 color de fondo
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 bg-slate-950 p-30">
        {
            servicios.map((servicio) => (
            <Estilos
            key={servicio.id}
            // paramentro de entrada del componente ServicioCard, que es un objeto con la informacion de un servicon concreto
            servicio = {servicio}
            />
            ))
        }
        </div>
    )
}