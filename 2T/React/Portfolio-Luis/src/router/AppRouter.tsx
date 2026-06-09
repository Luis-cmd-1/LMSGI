import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { Formacion } from "../pages/formacion/Formacion"  
import { Servicios } from "../pages/servicios/Servicios"
import Contacto from "../pages/Contacto"

import { Trabajos } from "@/pages/trabajos/Trabajos"
import { Cursos } from "@/pages/cursos/Curso"
import BackendLayout from "@/layouts/BackendLayout"
import AdminCursos from "@/pages/cursos/adminCursos"
import AdminFormacion from "@/pages/formacion/adminFormacion"
import AdminServicios from "@/pages/servicios/adminServicios"
import AdminTrabajos from "@/pages/trabajos/adminTrabajos"
import NotFound from "@/pages/NotFound"
import Home from "@/pages/Home"

    
export const AppRouter = () => {
    return(
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />} >
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Formacion" element={<Formacion/>}/>
                    <Route path="/servicios" element={<Servicios/>}/>
                    <Route path="/cursos" element={<Cursos/>}/>
                    <Route path="/contacto" element={<Contacto/>}/>
                    <Route path="/Trabajos" element={<Trabajos/>}/>
                    <Route path="*" element={<NotFound />} />                
                    </Route>

                    <Route path="/admin" element={<BackendLayout/>}>
                    <Route path="/admin/Cursos" element={<AdminCursos/>}/>
                    <Route path="/admin/Formacion" element={<AdminFormacion/>}/>
                    <Route path="/admin/Servicios" element={<AdminServicios/>}/>
                    <Route path="/admin/Trabajos" element={<AdminTrabajos/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
)
}