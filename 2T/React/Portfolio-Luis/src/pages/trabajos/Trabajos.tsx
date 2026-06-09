import { useEffect, useState } from 'react';
import type { ITrabajo } from '@/model/interfaces/ITrabajo';
import { getTrabajos } from '@/model/api/backend/apiTrabajos';
import { TrabajosCard } from '@/components/trabajos/TrabajosCard';

export const Trabajos = () => {
  
    const [trabajos, setTrabajos] = useState<ITrabajo[]>([]);

    const obtenerTrabajos = async () => {
        const data = await getTrabajos()
        setTrabajos(data)
    }

    useEffect(() => {
        obtenerTrabajos();
    }, [])

    return (
        <section className="relative min-h-screen px-6 pt-10 pb-24 lg:px-8 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Cabecera */}
                <div className="mb-10">
                    <span className="font-mono text-xs tracking-[4px] uppercase text-[#00c8ff]/70 border border-[#00c8ff]/20 px-3 py-1">
                        // PROYECTOS · PORTAFOLIO · TRABAJO
                    </span>
                    <h1 className="mt-6 text-5xl font-bold text-[#00c8ff] tracking-tight">
                        Trabajos
                    </h1>
                    <p className="mt-3 text-sm font-mono text-[#5a8fa8] max-w-xl">
                        Proyectos y trabajos destacados en desarrollo web, sistemas e infraestructura.
                    </p>
                </div>

                {/* Separador */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-xs tracking-[3px] uppercase text-[#5a8fa8]">Disponibles</span>
                    <div className="flex-1 h-px bg-[#00c8ff]/15" />
                </div>

                {/* Contenido */}
                {trabajos.length > 0 
                    ? (
                        <TrabajosCard trabajos={trabajos}/>
                    )
                    : <p className="text-[#5a8fa8] font-mono text-sm">Proximamente...</p>
                }

                {/* Footer decorativo */}
                <div className="mt-16 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#00c8ff]/10" />
                    <span className="font-mono text-xs text-[#5a8fa8]/50 tracking-widest">// APRENDIZAJE CONTINUO · EN CONSTANTE ACTUALIZACIÓN</span>
                    <div className="h-px flex-1 bg-[#00c8ff]/10" />
                </div>
            </div>
        </section>
    )

}
