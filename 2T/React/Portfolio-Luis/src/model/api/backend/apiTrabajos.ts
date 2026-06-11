import type { ITrabajo } from "@/model/interfaces/ITrabajo";
import { supabase } from "@/model/utils/supabase";


export const getTrabajos = async ():Promise<ITrabajo[]> => {
    const { data, error} = await supabase
                    .from('trabajos')
                    .select();
    if (error) {
        console.log(error);
    }
    return data as ITrabajo[];
}

export const insertTrabajo = async (trabajo: ITrabajo) => {
    console.log(trabajo)
    const { error} = await supabase
                    .from('trabajos')
                    .insert(trabajo);
    if (error) {
        console.error(error)
        return[]
    }
    return "Trabajo insertado correctamente";

}

export const updateTrabajo = async (trabajo_id: string, trabajoData: Partial<ITrabajo>) => {
    const { error } = await supabase
        .from('trabajos')
        .update(trabajoData)
        .eq('trabajo_id', trabajo_id);
    if (error) {
        console.error(error)
        throw error
    }
    return "Trabajo actualizado correctamente";
}

export const deleteTrabajo = async (trabajo_id: string) => {
    const { error } = await supabase
                    .from('trabajos')
                    .delete()
                    .eq('trabajo_id', trabajo_id);
    if (error) {
        console.error(error)
        throw error
    }
    return "Trabajo eliminado correctamente";
}
