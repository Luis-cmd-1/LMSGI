import { DeleteCursoForm } from "@/components/forms/DeleteCursoForm"
import { NewCursoForm } from "@/components/forms/NewCursoForm"
import { EditCursoForm } from "@/components/forms/UpdateCursoForm"



export default function AdminCursos() {
    return(
        <div>
            <h1>Admin Cursos</h1>
            <p>Esta es la pagina de administracion de cursos</p>
            <p>Aqui se pueden insertar, eliminar y modificar los cursos</p>
            <p>Para insertar un nuevo curso, completa el formulario con la informacion del curso y haz click en el boton de insertar</p>
            <NewCursoForm />
            <DeleteCursoForm/>
            <EditCursoForm/>
        </div>
    )
}