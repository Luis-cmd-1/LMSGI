import type { IServicios } from "@/model/interfaces/IServicios"
import { useParams } from "react-router-dom"
import dataTrabajos from "@/model/data/Servicios.json"

export const TrabajoDetalle = () =>{
    const { id } = useParams()
    const servicio = dataTrabajos.find((trav) => trav.id === Number(id)) as IServicios
    // Div: clasename: bg color fondo, min-h-screen quiere decir que utilize el height minimo de la web en cuyo caso toda la hoja, pt-24 padding-top: 24px, y el px padding-lateral-6px
    return( 
    <div className="bg-slate-950 min-h-screen text-white pt-24 px-6">
        <h1>Detalle del servicio</h1>
        {
            servicio ? (
                <div>
                    <p><strong>Nombre:</strong>{servicio.titulo}</p>
                    <p><strong>Descripcion:</strong>{servicio.descripcion}</p>
                    <p><strong>Categoria:</strong>{servicio.categoria}</p>
                </div>
            ) : (
                <p>Servicio no entcontrado</p>
            )
        }
        
        
    </div>
    )
}