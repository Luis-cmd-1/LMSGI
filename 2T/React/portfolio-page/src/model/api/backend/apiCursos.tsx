import type { ICurso } from "@/model/interfaces/ICurso";
import { supabase } from "@/model/utils/supabase";


export const getCursos = async ():Promise<ICurso[]> => {
    const { data, error} = await supabase
                    .from('cursos')
                    
                    .select();
    if (error) {
        console.log(error);
    }
    return data as ICurso[];
}

export const insertCurso = async (curso: ICurso) => {
    console.log(curso)
    const { data, error} = await supabase
                    .from('cursos')
                    .insert(curso);
    if (error) {
        console.error(error)
        return[]
    }
    return "Curso insertado correctamente";
}