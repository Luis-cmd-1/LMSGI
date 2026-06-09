import type { IFormacion } from "@/model/interfaces/IFormacion";
import { supabase } from "@/model/utils/supabase";


export const getFormaciones = async ():Promise<IFormacion[]> => {
    const { data, error} = await supabase
                    .from('formaciones')
                    .select();
    if (error) {
        console.log(error);
    }
    return data as IFormacion[];
}

export const insertFormacion = async (formacion: IFormacion) => {
    console.log(formacion)
    const { error} = await supabase
                    .from('formaciones')
                    .insert(formacion);
    if (error) {
        console.error(error)
        return[]
    }
    return "Formación insertada correctamente";

}
