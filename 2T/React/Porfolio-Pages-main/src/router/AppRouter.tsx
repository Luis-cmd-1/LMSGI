



import { BrowserRouter, Route, Routes } from "react-router-dom"; // Esto es un paquete npm install react-router-dom
import { MainLayout } from "../Layouts/MainLayout";
import  Home  from "../pages/Home";
import { Muestra } from "../pages/trabajos/Muestra";
import  Contacto  from "../pages/Contacto";
import dataservicios from "../model/data/Servicios.json"
import { TrabajoDetalle } from "@/pages/trabajos/TrabajoDetalle";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. Abrimos la ruta del Layout (sin el "/" inicial aquí) */}
                <Route path="/" element={<MainLayout />}>
                    
                    {/* Estos son los elemenentos que vayamos a tocar y nos cambiaran de pagina*/}
                    {/* Esto se renderiza en el <Outlet /> */}
                    <Route index element={<Home />} /> {/* Importante el index hace que la ruta por defecto sea la raiz en este caso /*/}
                    <Route path="/trabajos" element={<Muestra servicios={dataservicios}/>} />
                    <Route path="/trabajos/:id" element={<TrabajoDetalle  />} />
                    <Route path="/contacto" element={<Contacto />} />
                    
                </Route> 
            </Routes>
        </BrowserRouter>
    )
}