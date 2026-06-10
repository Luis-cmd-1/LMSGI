import { useState } from 'react';
import type { ITrabajo } from "@/model/interfaces/ITrabajo";

interface Props {
    trabajo: ITrabajo;
}

export const TrabajoCard = ({ trabajo }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const tecnologias = trabajo.tecnologias ?? "";

    return (
        <article className="relative flex flex-col border border-[#00c8ff]/20 bg-[#00c8ff]/5 p-6 hover:border-[#00c8ff]/40 hover:bg-[#00c8ff]/8 hover:shadow-[0_0_25px_rgba(0,200,255,0.25)] transition-all group">
            {/* Imagen del proyecto */}
            {trabajo.imagen && (
                <img 
                    src={trabajo.imagen}
                    alt={trabajo.titulo}
                    className="w-full aspect-video object-cover rounded-lg border border-[#00c8ff]/20 mb-4"
                />
            )}

            {/* Badge de empresa */}
            <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-widest uppercase border border-[#00c8ff]/30 text-[#00c8ff] px-2 py-0.5">
                    {trabajo.empresa}
                </span>

            </div>

            {/* Título */}
            <h3 className="font-mono text-base font-semibold text-white group-hover:text-[#00c8ff] transition-colors mb-2">
                {trabajo.titulo}
            </h3>

            {/* Fecha */}
            <p className="font-mono text-xs text-[#5a8fa8]/70 mb-4">
                📅 {trabajo.fecha}
            </p>

            {/* Expandable description */}
            <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-40 mb-4" : "max-h-0"}`}>
                <p className="text-xs text-[#7fa8c0] leading-relaxed border-l border-[#00c8ff]/20 pl-3">
                    {trabajo.descripcion}
                </p>
            </div>

            {tecnologias && (
                <p className="text-xs text-[#7fa8c0] leading-relaxed mb-4">
                    {tecnologias}
                </p>
            )}

            {/* Footer con botones */}
            <div className="mt-auto border-t border-[#00c8ff]/10 pt-4 flex items-center justify-between">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="font-mono text-xs text-[#00c8ff]/60 hover:text-white hover:drop-shadow-[0_0_6px_rgba(0,200,255,0.8)] hover:scale-105 active:scale-95 active:bg-[#00c8ff]/20 active:px-3 active:py-1 transition-all cursor-pointer"
                >
                    {expanded ? "[ — OCULTAR ]" : "[ + VER MÁS ]"}
                </button>
                
                {trabajo.enlace && (
                    <a
                        href={trabajo.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[#00c8ff] hover:text-[#00c8ff]/80 transition-colors"
                    >
                        → VISITAR
                    </a>
                )}
            </div>
        </article>
    )
}
