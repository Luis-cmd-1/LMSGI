import { useParams } from "react-router-dom"
import dataServicios from "@/model/data/servicios.json"
import type { IServicio } from "@/model/interfaces/IServicio"

export const ServicioDetalle = () => {
    const {id} = useParams()
    const servicio: IServicio=dataServicios.find((serv) => serv.id === Number(id)) 

    return (
        <div>
            <h1>Detalle del servicio {id}</h1>
            {
                servicio ? (
                    <div>
                        <p><strong>Nombre:</strong>{servicio.titulo}</p>
                        <p><strong>Descripción:</strong>{servicio.descripcion1}</p>
                        <p><strong>Categoria:</strong>{servicio.categoria}</p>
                        <img src={servicio.imagen} alt={servicio.titulo} className="w-1/2 object-cover rounded-lg" />
                    </div>
                ) : (
                    <p>Servicio no encontrado</p>
                )
            }
        </div>
    )

}