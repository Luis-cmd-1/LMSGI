import { useEffect, useState } from 'react';
import type { IServicio } from '@/model/interfaces/IServicio';
import { getServicios } from '@/model/api/backend/apiServicios';
import { ServiciosCard } from '@/components/servicios/ServiciosCard';

export const Servicios = () => {
  
    const [servicios, setServicios] = useState<IServicio[]>([]);

    const obtenerServicios = async () => {
        const data = await getServicios()
        setServicios(data)
    }

    useEffect(() => {
        obtenerServicios();
    }, [])

    return (
        <section className="relative min-h-screen px-6 pt-10 pb-24 lg:px-8 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Cabecera */}
                <div className="mb-10">
                    <span className="font-mono text-xs tracking-[4px] uppercase text-[#00c8ff]/70 border border-[#00c8ff]/20 px-3 py-1">
                        // SERVICIOS · SOLUCIONES · CONSULTORÍA
                    </span>
                    <h1 className="mt-6 text-5xl font-bold text-[#00c8ff] tracking-tight">
                        Servicios
                    </h1>
                    <p className="mt-3 text-sm font-mono text-[#5a8fa8] max-w-xl">
                        Servicios profesionales en desarrollo, infraestructura y consultoría técnica.
                    </p>
                </div>

                {/* Separador */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-xs tracking-[3px] uppercase text-[#5a8fa8]">Oferta</span>
                    <div className="flex-1 h-px bg-[#00c8ff]/15" />
                </div>

                {/* Contenido */}
                {servicios.length > 0 
                    ? (
                        <ServiciosCard servicios={servicios}/>
                    )
                    : <p className="text-[#5a8fa8] font-mono text-sm">No hay servicios disponibles</p>
                }

                {/* Footer decorativo */}
                <div className="mt-16 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#00c8ff]/10" />
                    <span className="font-mono text-xs text-[#5a8fa8]/50 tracking-widest">// SOLUCIONES PERSONALIZADAS · CONSULTA SIN COMPROMISO</span>
                    <div className="h-px flex-1 bg-[#00c8ff]/10" />
                </div>
            </div>
        </section>
    )

}
