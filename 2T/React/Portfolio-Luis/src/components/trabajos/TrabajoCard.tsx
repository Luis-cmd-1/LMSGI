import { useState } from 'react';
import type { ITrabajo } from "@/model/interfaces/ITrabajo";

interface Props {
    trabajo: ITrabajo;
}

export const TrabajoCard = ({ trabajo }: Props) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <article className="relative flex flex-col border border-[#00c8ff]/20 bg-[#00c8ff]/5 p-6 hover:border-[#00c8ff]/40 hover:bg-[#00c8ff]/8 transition-all group">
            {/* Imagen del proyecto */}
            {trabajo.imagen && (
                <img 
                    src={trabajo.imagen}
                    alt={trabajo.titulo}
                    className="w-full h-40 object-cover rounded-lg border border-[#00c8ff]/20 mb-4"
                />
            )}

            {/* Badge de empresa */}
            <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-widest uppercase border border-[#00c8ff]/30 text-[#00c8ff] px-2 py-0.5">
                    {trabajo.empresa}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-[#00c8ff]">
                    <span className="inline-block size-1.5 rounded-full bg-[#00c8ff] animate-pulse" />
                    Activo
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

            {/* Tecnologías */}
            <div className="flex flex-wrap gap-2 mb-4">
                {trabajo.tecnologias && trabajo.tecnologias.map((tech) => (
                    <span key={tech} className="font-mono text-xs px-2 py-1 bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] rounded">
                        {tech}
                    </span>
                ))}
            </div>

            {/* Footer con botones */}
            <div className="mt-auto border-t border-[#00c8ff]/10 pt-4 flex items-center justify-between">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="font-mono text-xs text-[#00c8ff]/60 group-hover:text-[#00c8ff] transition-colors cursor-pointer"
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
