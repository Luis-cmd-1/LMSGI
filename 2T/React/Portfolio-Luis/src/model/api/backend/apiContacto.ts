import { supabase } from "@/model/utils/supabase";

export const insertContacto = async (contacto: {
  nombre: string;
  apellido: string;
  correo: string;
  mensaje: string;
}) => {
  const { error } = await supabase
    .from("contactos")
    .insert(contacto);
  if (error) {
    console.error(error);
    throw error;
  }
  return "Mensaje enviado correctamente";
};
