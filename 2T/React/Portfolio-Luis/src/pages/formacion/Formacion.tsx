import { useEffect, useState } from 'react';
import type { IFormacion } from '@/model/interfaces/IFormacion';
import { getFormaciones } from '@/model/api/backend/apiFormacion';
import { FormacionesCard } from '@/components/formacion/FormacionesCard';

export const Formacion = () => {
  
    // useState: crea una variable "formaciones" que empieza como array vacío.
    // setFormaciones es la función que la actualiza.
    // Cuando los datos lleguen de Supabase, guardamos aquí el array de formaciones.
    const [formaciones, setFormaciones] = useState<IFormacion[]>([]);

    // Función asíncrona: va a buscar los datos a Supabase (o al mock si no hay conexión).
    // await getFormaciones() espera a que llegue la respuesta.
    // setFormaciones(data) guarda los datos en el estado para que React renderice.
    const obtenerFormaciones = async () => {
        const data = await getFormaciones()
        setFormaciones(data)
    }

    // useEffect con [] vacío: se ejecuta UNA SOLA VEZ cuando el componente se monta.
    // Sin el [], se ejecutaría en cada actualización → bucle infinito de llamadas.
    useEffect(() => {
        obtenerFormaciones();
    }, [])

    return (
        <section className="relative min-h-screen px-6 pt-10 pb-24 lg:px-8 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Cabecera: título principal con badge decorativo y descripción */}
                <div className="mb-10">
                    <span className="font-mono text-xs tracking-[4px] uppercase text-[#00c8ff]/70 border border-[#00c8ff]/20 px-3 py-1">
                        // FORMACIÓN · EDUCACIÓN · CERTIFICACIONES
                    </span>
                    <h1 className="mt-6 text-5xl font-bold text-[#00c8ff] tracking-tight">
                        Formación
                    </h1>
                    <p className="mt-3 text-sm font-mono text-[#5a8fa8] max-w-xl">
                        Estudios académicos, certificaciones técnicas y cursos especializados en desarrollo e infraestructura.
                    </p>
                </div>

                {/* Separador visual: línea decorativa entre cabecera y contenido */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-xs tracking-[3px] uppercase text-[#5a8fa8]">Disponibles</span>
                    <div className="flex-1 h-px bg-[#00c8ff]/15" />
                </div>

                {/* Renderizado condicional:
                    - Si hay formaciones (length > 0): pinta el componente FormacionesCard
                      que las recorre con .map() y crea una tarjeta por cada una.
                    - Si no hay: muestra un mensaje de "no disponibles".
                      Es una red de seguridad: si Supabase falla o devuelve vacío,
                      el usuario ve este texto en lugar de una pantalla en blanco. */}
                {formaciones.length > 0 
                    ? (
                        <FormacionesCard formaciones={formaciones}/>
                    )
                    : <p className="text-[#5a8fa8] font-mono text-sm">No hay formaciones disponibles</p>
                }

                {/* Footer decorativo: línea horizontal con texto al centro */}
                <div className="mt-16 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#00c8ff]/10" />
                    <span className="font-mono text-xs text-[#5a8fa8]/50 tracking-widest">// APRENDIZAJE CONTINUO · EN CONSTANTE ACTUALIZACIÓN</span>
                    <div className="h-px flex-1 bg-[#00c8ff]/10" />
                </div>
            </div>
        </section>
    )

}
