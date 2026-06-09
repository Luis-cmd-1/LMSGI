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

export const deleteFormacion = async (formacion_id: string) => {
    const { error } = await supabase
                    .from('formaciones')
                    .delete()
                    .eq('formacion_id', formacion_id);
    if (error) {
        console.error(error)
        throw error
    }
    return "Formación eliminada correctamente";
}

export const updateFormacion = async (formacion_id: string, formacionData: Partial<IFormacion>) => {
    const { error } = await supabase
                    .from('formaciones')
                    .update(formacionData)
                    .eq('formacion_id', formacion_id);
    if (error) {
        console.error(error)
        throw error
    }
    return "Formación actualizada correctamente";
}
