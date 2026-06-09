import { Link } from 'react-router-dom';
import type { IFormacion } from "@/model/interfaces/IFormacion";

interface Props {
    formacion: IFormacion;
}

export const FormacionCard = ({ formacion }: Props) => {
    return (
        <article className="relative flex flex-col border border-[#00c8ff]/20 bg-[#00c8ff]/5 p-6 hover:border-[#00c8ff]/40 hover:bg-[#00c8ff]/8 transition-all group">
            {/* Badge de categoría: muestra si es "FP Superior", "Certificación", etc. */}
            <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-widest uppercase border border-[#00c8ff]/30 text-[#00c8ff] px-2 py-0.5">
                    {formacion.categoria}
                </span>
            </div>

            {/* Título de la formación (ej: "Técnico Superior en ASIR") */}
            <h3 className="font-mono text-base font-semibold text-white group-hover:text-[#00c8ff] transition-colors mb-2">
                {formacion.titulo}
            </h3>

            {/* Autor/Institución que imparte la formación */}
            <p className="font-mono text-xs text-[#5a8fa8] mb-3">
                👤 {formacion.autor_nombre}
            </p>

            {/* Fecha o período (ej: "2025-2027") */}
            <p className="font-mono text-xs text-[#5a8fa8]/70 mb-4">
                📅 {formacion.fecha}
            </p>

            {/* Footer con enlace al detalle:
                Al hacer clic, navega a la página de detalle de esta formación.
                El enlace usa Link de react-router-dom para ir a /formacion/:id. */}
            <div className="mt-auto border-t border-[#00c8ff]/10 pt-4">
                <Link
                    to={`/formacion/${formacion.formacion_id}`}
                    className="font-mono text-xs text-[#00c8ff]/60 group-hover:text-[#00c8ff] transition-colors hover:opacity-100"
                >
                    [ + VER MÁS ]
                </Link>
            </div>
        </article>
    )
}
