import { useState } from 'react';
import type { IServicio } from "@/model/interfaces/IServicio";

interface Props {
    servicio: IServicio;
}

export const ServicioCard = ({ servicio }: Props) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <article className="relative flex flex-col border border-[#00c8ff]/20 bg-[#00c8ff]/5 p-6 hover:border-[#00c8ff]/40 hover:bg-[#00c8ff]/8 hover:shadow-[0_0_25px_rgba(0,200,255,0.25)] transition-all group">
            {/* Badge de tipo */}
            <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-widest uppercase border border-[#00c8ff]/30 text-[#00c8ff] px-2 py-0.5">
                    {servicio.tipo}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-[#00c8ff]">
                    <span className="inline-block size-1.5 rounded-full bg-[#00c8ff] animate-pulse" />
                    Disponible
                </span>
            </div>

            {/* Icono/Título */}
            <div className="flex items-center gap-3 mb-4">
                {/* {servicio.icono && (
                    <span className="text-3xl">{servicio.icono}</span>
                )} */}
                <h3 className="font-mono text-base font-semibold text-white group-hover:text-[#00c8ff] transition-colors">
                    {servicio.nombre}
                </h3>
            </div>

            {/* Expandable description */}
            <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-40 mb-4" : "max-h-0"}`}>
                <p className="text-xs text-[#7fa8c0] leading-relaxed border-l border-[#00c8ff]/20 pl-3">
                    {servicio.descripcion}
                </p>
            </div>

            {/* Características */}
            <div className="mb-4">
    <span className="font-mono text-xs px-2 py-1 bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] rounded">
        {servicio.caracteristicas}
    </span>
</div>

            {/* Footer con precio y botones */}
            <div className="mt-auto border-t border-[#00c8ff]/10 pt-4">
                <div className="flex items-center justify-between">
                    {servicio.precio && (
                        <span className="font-mono text-sm font-semibold text-[#00c8ff]">
                            {servicio.precio}
                        </span>
                    )}
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="font-mono text-xs text-[#00c8ff]/60 hover:text-white hover:drop-shadow-[0_0_6px_rgba(0,200,255,0.8)] hover:scale-105 active:scale-95 active:bg-[#00c8ff]/20 active:px-3 active:py-1 transition-all cursor-pointer"
                    >
                        {expanded ? "[ — OCULTAR ]" : "[ + VER MÁS ]"}
                    </button>
                </div>
            </div>
        </article>
    )
}
