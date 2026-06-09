import { Link } from "react-router-dom"

export default function NotFound () {
  return (
    <main className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6">
      <span className="font-mono text-xs tracking-[4px] uppercase text-[#00c8ff] opacity-70">
        ./error
      </span>
      <h1 className="mt-4 text-8xl font-semibold text-white tracking-tight">404</h1>
      <p className="mt-4 font-mono text-sm text-[#5a8fa8] tracking-wide">
        Página no encontrada
      </p>
      <div className="mt-6 h-px w-16 bg-[#00c8ff]/40" />
      <Link
        to="/"
        className="mt-8 rounded border-2 border-[#00c8ff]/50 bg-[#00c8ff]/10 px-6 py-2.5 font-mono text-xs tracking-widest uppercase text-[#00c8ff] hover:bg-[#00c8ff]/20 hover:border-[#00c8ff] transition-all"
      >
        ← Volver al inicio
      </Link>
    </main>
  )
}