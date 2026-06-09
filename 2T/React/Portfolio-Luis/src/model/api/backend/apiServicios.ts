import type { IServicio } from "@/model/interfaces/IServicio";
import { supabase } from "@/model/utils/supabase";


export const getServicios = async ():Promise<IServicio[]> => {
    const { data, error} = await supabase
                    .from('servicios')
                    .select();
    if (error) {
        console.log(error);
    }
    return data as IServicio[];
}

export const insertServicio = async (servicio: IServicio) => {
    console.log(servicio)
    const { error} = await supabase
                    .from('servicios')
                    .insert(servicio);
    if (error) {
        console.error(error)
        return[]
    }
    return "Servicio insertado correctamente";

}

export const deleteServicio = async (servicio_id: string) => {
    const { error } = await supabase
                    .from('servicios')
                    .delete()
                    .eq('servicio_id', servicio_id);
    if (error) {
        console.error(error)
        throw error
    }
    return "Servicio eliminado correctamente";
}

export const updateServicio = async (servicio_id: string, servicioData: Partial<IServicio>) => {
    const { error } = await supabase
                    .from('servicios')
                    .update(servicioData)
                    .eq('servicio_id', servicio_id);
    if (error) {
        console.error(error)
        throw error
    }
    return "Servicio actualizado correctamente";
}
