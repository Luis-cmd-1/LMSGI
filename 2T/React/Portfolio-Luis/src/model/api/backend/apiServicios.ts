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