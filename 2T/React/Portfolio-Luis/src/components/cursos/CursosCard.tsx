import type { ICurso } from "@/model/interfaces/ICurso";
import { CursoCard } from "./CursoCard";

interface Props {
    cursos: ICurso[];
}

export const CursosCard = ({ cursos }: Props) => {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {cursos.map((curso) => (
                <CursoCard key={curso.curso_id} curso={curso} />
            ))}
        </div>
    )
}