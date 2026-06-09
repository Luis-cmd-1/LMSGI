// import { useEffect, useState } from 'react';
// import { getCursos } from '@/model/api/backend/apiCursos';
// import { CursosCard } from '@/components/main/cursos/CursosCard';

import { NewCursoForm } from "@/components/main/cursos/newCursoForm"

// import { NewCursoForm } from "@/components/main/cursos/newCursoForm"

// import { NewCursoForm } from "@/components/main/cursos/newCursoForm"

export const AdminCursos = () => {
 
    // const [cursos, setCursos] = useState([]);
    // //hook es una funcion interna de react que nos permite usar el estado y otras caracteristicas de react sin escribir una clase
    // //hook useState para almacenar los curos que se van a mostrar en la pagina
    // const obtenerCursos = async () => {
    //     //realizar la petiscion a  SUPABASE para obtener los cursos
    //     const data = await getCursos()
    //     setCursos(data)
    // }

    // useEffect(() => {
    //     obtenerCursos();
    // }, [])

    return (
        <div>
            <h1>Administracion de  Cursos</h1>
            <NewCursoForm/>
            
        </div>
    )
    //     (
    //         cursos.length > 0 
    //         ? (
    //             <CursosCard cursos={cursos}/>
    //         )
    //         : <p>No hay cursos disponibles</p>
    //     )
    // )

  
}