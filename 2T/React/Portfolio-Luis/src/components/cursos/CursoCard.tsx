import type { ICurso } from "@/model/interfaces/ICurso";

interface Props {
    curso: ICurso;
}

export const CursoCard = ({ curso }: Props) => {
    return (
        <article className="relative flex flex-col border border-[#00c8ff]/20 bg-[#00c8ff]/5 p-6 hover:border-[#00c8ff]/40 hover:bg-[#00c8ff]/8 transition-all group">
            {/* Badge de categoría y academia */}
            <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-widest uppercase border border-[#00c8ff]/30 text-[#00c8ff] px-2 py-0.5">
                    {curso.categoria}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-[#00c8ff]">
                    <span className="inline-block size-1.5 rounded-full bg-[#00c8ff] animate-pulse" />
                    Activo
                </span>
            </div>

            {/* Título */}
            <h3 className="font-mono text-base font-semibold text-white group-hover:text-[#00c8ff] transition-colors mb-2">
                {curso.titulo}
            </h3>

            {/* Academia */}
            <p className="font-mono text-xs text-[#5a8fa8] mb-4">
                📚 {curso.academia}
            </p>

            {/* Footer con precio */}
            <div className="mt-auto border-t border-[#00c8ff]/10 pt-4">
                <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-[#00c8ff]">
                        ${curso.precio}
                    </span>
                    <span className="font-mono text-xs text-[#00c8ff]/60 group-hover:text-[#00c8ff] transition-colors cursor-pointer">
                        [ + VER MÁS ]
                    </span>
                </div>
            </div>
        </article>
    )
}