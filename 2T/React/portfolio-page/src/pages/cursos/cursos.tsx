import { useEffect, useState } from 'react';
import { getCursos } from '@/model/api/backend/apiCursos.tsx';
import { CursosCard } from '@/components/main/cursos/CursosCard';

export const Cursos = () => {
 
    const [cursos, setCursos] = useState([]);
    //hook es una funcion interna de react que nos permite usar el estado y otras caracteristicas de react sin escribir una clase
    //hook useState para almacenar los curos que se van a mostrar en la pagina
    const obtenerCursos = async () => {
        //realizar la petiscion a  SUPABASE para obtener los cursos
        const data = await getCursos()
        setCursos(data)
    }

    useEffect(() => {
        obtenerCursos();
    }, [])

    return (
        cursos.length > 0 
            ? (
                <CursosCard cursos={cursos}/>
            )
            : <p>No hay cursos disponibles</p>
    )

    // const [cursos, setCursos] = useState([]);

    // const getCursos = async () => {
        
    //     //realizar la petiscion a  SUPABASE para obtener los cursos
    //     const {data} = await supabase
    //                         .from('cursos')
    //                         .select('*');
        
    //     setCursos(data)
    // }


    // useEffect(() => {
    //     getCursos();
    // }, [])

    // return (
    //     cursos.length > 0 
    //         ? (
    //             <ul>
    //                 {
    //                     cursos.map((curso) => (
    //                         <li key={curso.curso_id}>{curso.titulo} - {curso.precio}</li>
    //                     ))
    //                 }
    //             </ul>
    //         )
    //         : <p>No hay cursos disponibles</p>
    // )

}