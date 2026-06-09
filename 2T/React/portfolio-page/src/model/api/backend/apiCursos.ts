import { supabase } from "@/model/utils/supabase";
import type { ICurso } from "@/model/interfaces/ICurso";

export const insertCurso = async (data: ICurso) => {
  try {
    const { data: result, error } = await supabase
      .from("cursos")
      .insert([data])
      .select();

    if (error) {
      console.error("Error inserting curso:", error);
      throw error;
    }

    console.log("Curso insertado exitosamente:", result);
    return result;
  } catch (error) {
    console.error("Error en insertCurso:", error);
    throw error;
  }
};
