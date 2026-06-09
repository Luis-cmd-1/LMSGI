import type { ICurso } from "@/model/interfaces/ICurso";
import { CursoCard } from "./CursoCard";

interface Props {
    cursos: ICurso[];
}

export const CursosCard = ({ cursos }: Props) => {
    return (
        <>
            <h2 className="text-center">Listado de Productos</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ul>
                    {cursos.map((curso) => (
                        <>
                            <li>{curso.titulo} ({curso.precio})</li>
                            <CursoCard curso={curso} />
                        </>
                    ))}
                </ul>
            </div>
        </>
    )
}