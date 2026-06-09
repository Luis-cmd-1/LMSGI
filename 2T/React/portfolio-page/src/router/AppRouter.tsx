import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { Contacto } from "../pages/Contacto"
import { Trabajos } from "../pages/Trabajos"
import { Home } from "../pages/Home"
import Formacion from "../pages/Formacion"
import Servicios from "@/pages/Servicios"
import QSomos from "@/pages/QSomos"
import { ServicioDetalle } from "@/pages/servicios/ServiciosDetalle"
import { BackendLayout } from "@/layouts/BackendLayout"
import { Cursos } from "@/pages/cursos/cursos"
import { AdminCursos } from "@/pages/cursos/adminCursos"

export const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />} >
                    <Route path="/" element={<Home/>}/>
                    <Route path="/qsomos" element={<QSomos/>}/>
                    <Route path="/formacion" element={<Formacion/>}/>
                    <Route path="/servicios" element={<Servicios/>}/>
                    <Route path="/servicios/:id" element={<ServicioDetalle/>}/>
                    <Route path="/trabajos" element={<Trabajos/>}/>
                    <Route path="/contacto" element={<Contacto/>}/>
                    <Route path="/cursos" element={<Cursos/>}/>
                </Route>

                <Route path="/admin" element={<BackendLayout/>}>
                <Route path="/admin/cursos" element={<AdminCursos/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}