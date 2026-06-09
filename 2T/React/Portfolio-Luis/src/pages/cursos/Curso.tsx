import { useEffect, useState } from 'react';
import type { ICurso } from '@/model/interfaces/ICurso';
import { getCursos } from '@/model/api/backend/apiCursos';
import { CursosCard } from '@/components/cursos/CursosCard';

export const Cursos = () => {
 
    const [cursos, setCursos] = useState<ICurso[]>([]);
    //hook es una funcion interna de react que nos permite usar el estado y otras caracteristicas de react sin escribir una clase
    //hook useState para almacenar los curos que se van a mostrar en la pagina
    const obtenerCursos = async () => {
        //realizar la petiscion a  SUPABASE para obtener los cursos
        const data = await getCursos()
        setCursos(data)
    }

    useEffect(() => {
        obtenerCursos();
    }, [])

    return (
        <section className="relative min-h-screen px-6 pt-10 pb-24 lg:px-8 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Cabecera */}
                <div className="mb-10">
                    <span className="font-mono text-xs tracking-[4px] uppercase text-[#00c8ff]/70 border border-[#00c8ff]/20 px-3 py-1">
                        // CURSOS · APRENDIZAJE · DESARROLLO
                    </span>
                    <h1 className="mt-6 text-5xl font-bold text-[#00c8ff] tracking-tight">
                        Cursos
                    </h1>
                    <p className="mt-3 text-sm font-mono text-[#5a8fa8] max-w-xl">
                        Cursos y recursos de aprendizaje continuo sobre desarrollo web, sistemas e infraestructura.
                    </p>
                </div>

                {/* Separador */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-xs tracking-[3px] uppercase text-[#5a8fa8]">Disponibles</span>
                    <div className="flex-1 h-px bg-[#00c8ff]/15" />
                </div>

                {/* Contenido */}
                {cursos.length > 0 
                    ? (
                        <CursosCard cursos={cursos}/>
                    )
                    : <p className="text-[#5a8fa8] font-mono text-sm">No hay cursos disponibles</p>
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