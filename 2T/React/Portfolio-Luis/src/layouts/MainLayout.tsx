import { Outlet } from "react-router-dom"
import Header from "../components/main/Header"
import Footer from "../components/main/Footer"




export function MainLayout() {
  return (
    <div className="relative min-h-screen bg-[#050d1a] flex flex-col">
      {/* Grid background global */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,200,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

            <Header />
            <main className="flex-1 relative z-10">
              {/* El componente Outlet es un componente de React Router que se utiliza para renderizar los componentes */}
                <Outlet />
            </main>
            <Footer />
    </div>
  )
}