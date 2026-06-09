import type { ICurso } from "@/model/interfaces/ICurso";

interface Props {
    curso: ICurso;
}

export const CursoCard = ({ curso }: Props) => {
    return (
        <div className="border rounded-lg p-4">
            <h3>{curso.titulo}</h3>
            <p>{curso.precio}</p>
        </div>
    )
}