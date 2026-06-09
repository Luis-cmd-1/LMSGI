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