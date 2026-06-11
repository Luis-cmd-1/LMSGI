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
    const { error} = await supabase
                    .from('cursos')
                    .insert(curso);
    if (error) {
        console.error(error)
        return[]
    }
    return "Curso insertado correctamente";

}

export const deleteCurso = async (curso_id: string) => {
    const { error } = await supabase
                    .from('cursos')
                    .delete()
                    .eq('curso_id', curso_id);
    if (error) {
        console.error(error)
        throw error
    }
    return "Curso eliminado correctamente";
}

export const updateCurso = async (curso_id: string, cursoData: Partial<ICurso>) => {
    const { error } = await supabase
        .from('cursos')
        .update(cursoData)
        .eq('curso_id', curso_id);
    if (error) {
        console.error(error)
        throw error
    }
    return "Curso actualizado correctamente";
}

// Obtener un solo curso por su ID para cargar el formulario
export const getCursoById = async (curso_id: string): Promise<ICurso | null> => {
    const { data, error } = await supabase
                    .from('cursos')
                    .select()
                    .eq('curso_id', curso_id)
                    .single(); // Trae solo un objeto en vez de un array
    if (error) {
        console.error(error);
        return null;
    }
    return data as ICurso;
}
