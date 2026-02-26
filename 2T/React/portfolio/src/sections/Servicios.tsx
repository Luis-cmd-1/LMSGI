
import dataservicios from "../../data/servicios.json";

const Servicios = () => {
    return (
        <section id="Servicios" className="min-h-screen flex-col items-center justify-center">
            <h1>
                Servicios Ofrecidos       
            </h1>
            <ol className="list-[upper-roman] list-inside text-left text-red-400">
                {
                    dataservicios.map ( (servicio) =>(
                        <li>{servicio.titulo}</li>
                    ))
                }
            </ol>
        </section>
    )

}

export default Servicios 