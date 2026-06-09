import type { IFormacion } from "@/model/interfaces/IFormacion";
import { supabase } from "@/model/utils/supabase";

// READ (SELECT): Obtiene TODAS las formaciones de la tabla "formaciones" en Supabase.
// async: función asíncrona que espera la respuesta de la base de datos.
// Promise<IFormacion[]>: devuelve una promesa que se resuelve en un array de formaciones.
// Uso típico: se llama desde useEffect al cargar la página de Formación.
// Si hay error, lo imprime en consola pero NO interrumpe el flujo — devuelve data como array.
export const getFormaciones = async (): Promise<IFormacion[]> => {
    const { data, error } = await supabase
        .from('formaciones')
        .select();                                       // SELECT * FROM formaciones
    if (error) {
        console.log(error);
    }
    return data as IFormacion[];                         // Convierte el resultado al tipo esperado
}

export const getFormacionById = async (formacion_id: string): Promise<IFormacion | null> => {
    const { data, error } = await supabase
        .from('formaciones')
        .select()
        .eq('formacion_id', formacion_id)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data as IFormacion;
}

// CREATE (INSERT): Añade una nueva formación a la tabla "formaciones".
// Recibe un objeto formacion que debe cumplir con la interfaz IFormacion.
// El console.log(formacion) es útil para depurar (ver qué datos se envían).
// Si hay error: devuelve un array vacío como señal de fallo.
// Si funciona: devuelve un mensaje de éxito que se muestra al usuario.
export const insertFormacion = async (formacion: IFormacion) => {
    console.log(formacion)
    const { error } = await supabase
        .from('formaciones')
        .insert(formacion);                              // INSERT INTO formaciones VALUES (...)
    if (error) {
        console.error(error)
        return []
    }
    return "Formación insertada correctamente";
}

// DELETE (BORRADO): Elimina una formación por su ID.
// Recibe formacion_id (string) que identifica la fila a borrar.
// .delete() indica que es una operación de borrado.
// .eq('formacion_id', formacion_id) filtra: solo borra donde el ID coincida.
//   Ej: DELETE FROM formaciones WHERE formacion_id = '1'
// Si hay error: lanza una excepción (throw error) para que el formulario la capture.
// Si funciona: devuelve un mensaje de confirmación.
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

// UPDATE (ACTUALIZAR): Modifica una formación existente.
// Recibe:
//   - formacion_id: el ID de la formación a modificar.
//   - formacionData: Partial<IFormacion> → solo los campos que cambian (no hace falta el objeto completo).
//     Partial<T> es un tipo de TypeScript que hace que todos los campos sean opcionales.
// .update(formacionData) envía los campos modificados a Supabase.
// .eq('formacion_id', formacion_id) filtra: solo actualiza donde el ID coincida.
//   Ej: UPDATE formaciones SET titulo='...', centro='...' WHERE formacion_id = '1'
// Si hay error: lanza una excepción para que el formulario la maneje.
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
