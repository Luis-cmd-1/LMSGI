import { ContactForm } from "@/components/main/ContactForm"

export default function Contacto() {
  return (
    <section className="relative min-h-screen px-6 pt-10 pb-24 lg:px-8 overflow-hidden">
      {/* Cabecera */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs tracking-[4px] uppercase text-[#00c8ff] opacity-70 border border-[#00c8ff]/20 px-3 py-1">
          ./contacto
        </span>
        <h2 className="mt-6 text-5xl font-bold text-[#00c8ff] tracking-tight">
          Hablemos
        </h2>
        <p className="mt-3 text-sm font-mono tracking-wide text-[#5a8fa8]">
          Déjame tu correo y mensaje — te respondo en menos de 24 horas.
        </p>
        <div className="mt-6 mx-auto h-px w-16 bg-[#00c8ff]/40" />
      </div>

      {/* Formulario */}
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 border border-[#00c8ff]/20 rounded-xl p-12">
        <ContactForm />

        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#00c8ff]/10" />
          <span className="font-mono text-xs text-[#5a8fa8]/50 tracking-widest">Tu correo no será compartido con nadie.</span>
          <div className="h-px flex-1 bg-[#00c8ff]/10" />
        </div>
      </div>
    </section>
  )
}