import { useState } from "react"
import { insertContacto } from "@/model/api/backend/apiContacto"

export function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    mensaje: "",
    website: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    if (form.website !== "") return "Detectado como spam."
    if (form.nombre.trim().length < 2) return "El nombre es muy corto."
    if (form.apellido.trim().length < 2) return "El apellido es muy corto."
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.correo)) return "Correo no válido."
    if (form.mensaje.trim().length < 10) return "El mensaje es muy corto."
    if (form.mensaje.trim().length > 1000) return "El mensaje es muy largo."
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validate()
    if (validationError) {
      setErrorMsg(validationError)
      setStatus("error")
      return
    }

    setStatus("sending")
    setErrorMsg("")

    try {
      await insertContacto({
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        correo: form.correo.trim(),
        mensaje: form.mensaje.trim(),
      })
      setStatus("success")
      setForm({ nombre: "", apellido: "", correo: "", mensaje: "", website: "" })
    } catch (err) {
      console.error("ContactForm submit error:", err)
      const msg = err instanceof Error ? err.message : "Error desconocido"
      setStatus("error")
      setErrorMsg(msg)
    }
  }

  const inputBase =
    'block w-full rounded-md bg-[#00c8ff]/5 px-3.5 py-2.5 text-sm text-white font-mono ' +
    'border border-[#00c8ff]/20 placeholder:text-[#5a8fa8] ' +
    'focus:outline-none focus:border-[#00c8ff]/60 focus:ring-1 focus:ring-[#00c8ff]/30 ' +
    'transition-colors'

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
      <div>
        <label htmlFor="cf-nombre" className="block font-mono text-xs tracking-widest uppercase text-[#5a8fa8] mb-2">
          Nombre
        </label>
        <input
          id="cf-nombre"
          name="nombre"
          type="text"
          autoComplete="given-name"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className={inputBase}
        />
      </div>

      <div>
        <label htmlFor="cf-apellido" className="block font-mono text-xs tracking-widest uppercase text-[#5a8fa8] mb-2">
          Apellido
        </label>
        <input
          id="cf-apellido"
          name="apellido"
          type="text"
          autoComplete="family-name"
          placeholder="Tu apellido"
          value={form.apellido}
          onChange={handleChange}
          required
          className={inputBase}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="cf-correo" className="block font-mono text-xs tracking-widest uppercase text-[#5a8fa8] mb-2">
          Correo electrónico
        </label>
        <input
          id="cf-correo"
          name="correo"
          type="email"
          autoComplete="email"
          placeholder="ejemplo@gmail.com"
          value={form.correo}
          onChange={handleChange}
          required
          className={inputBase}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="cf-mensaje" className="block font-mono text-xs tracking-widest uppercase text-[#5a8fa8] mb-2">
          Mensaje
        </label>
        <textarea
          id="cf-mensaje"
          name="mensaje"
          rows={5}
          placeholder="Cuéntame un poco..."
          value={form.mensaje}
          onChange={handleChange}
          required
          className={inputBase + " resize-none"}
        />
      </div>

      {status === "error" && (
        <div className="sm:col-span-2">
          <p className="text-red-400 text-sm font-mono">{errorMsg}</p>
        </div>
      )}
      {status === "success" && (
        <div className="sm:col-span-2">
          <p className="text-[#00c8ff] text-sm font-mono">¡Mensaje enviado correctamente!</p>
        </div>
      )}

      {/* honeypot antispam — al final para evitar autofill */}
      <div aria-hidden="true" className="sm:col-span-2 absolute left-[-9999px] opacity-0 h-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className="sm:col-span-2 mt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className={`w-full rounded-md px-3.5 py-3 font-mono text-sm tracking-widest uppercase transition-all duration-200 border ${
            status !== "sending"
              ? 'bg-[#00c8ff]/10 border-[#00c8ff]/50 text-[#00c8ff] hover:bg-[#00c8ff]/20 hover:border-[#00c8ff] cursor-pointer'
              : 'bg-transparent border-[#00c8ff]/10 text-[#5a8fa8] cursor-not-allowed'
          }`}
        >
          {status === "sending" ? "Enviando..." : "Enviar mensaje →"}
        </button>
      </div>
    </form>
  )
}
