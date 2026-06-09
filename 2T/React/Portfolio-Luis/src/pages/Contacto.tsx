import { useState } from 'react'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Contacto() {
  const [agreed,] = useState(false)
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', mensaje: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // TODO: integrar Formspree / EmailJS aquí
    console.log('Enviando...', form)
  }

  const inputBase =
    'block w-full rounded-md bg-[#00c8ff]/5 px-3.5 py-2.5 text-sm text-white font-mono ' +
    'border border-[#00c8ff]/20 placeholder:text-[#5a8fa8] ' +
    'focus:outline-none focus:border-[#00c8ff]/60 focus:ring-1 focus:ring-[#00c8ff]/30 ' +
    'transition-colors'

  return (
    <section className="relative min-h-screen px-6 pt-10 pb-24 lg:px-8 overflow-hidden">
        
      {/* Glow de fondo — igual que el Hero */}
      {/* <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 aspect-[1155/678] w-[36rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#00c8ff]/20 to-[#0047ff]/10 opacity-30 sm:left-[calc(50%-20rem)] sm:w-[72rem]"
        />
      </div> */}

      {/* Cabecera */}
      <div className="mx-auto max-w-2xl text-center ">
        {/* Etiqueta mono pequeña — mismo estilo que el nav */}
        <span className="font-mono text-xs tracking-[4px] uppercase text-[#00c8ff] opacity-70 border border-[#00c8ff]/20 px-3 py-1">
          ./contacto
        </span>
        <h2 className="mt-6 text-5xl font-bold text-[#00c8ff] tracking-tight">
          Hablemos
        </h2>
        <p className="mt-3 text-sm font-mono tracking-wide text-[#5a8fa8]">
          Déjame tu correo y mensaje — te respondo en menos de 24 horas.
        </p>
        {/* Línea decorativa cyan */}
        <div className="mt-6 mx-auto h-px w-16 bg-[#00c8ff]/40" />
      </div>

      {/* Formulario */}
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 border-3 border-[#00c8ff]/20 rounded-xl p-12">
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">

          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block font-mono text-xs tracking-widest uppercase text-[#5a8fa8] mb-2">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="given-name"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Apellido */}
          <div>
            <label htmlFor="apellido" className="block font-mono text-xs tracking-widest uppercase text-[#5a8fa8] mb-2">
              Apellido
            </label>
            <input
              id="apellido"
              name="apellido"
              type="text"
              autoComplete="family-name"
              placeholder="Tu apellido"
              value={form.apellido}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block font-mono text-xs tracking-widest uppercase text-[#5a8fa8] mb-2">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="ejemplo@gmail.com"
              value={form.email}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Mensaje */}
          <div className="sm:col-span-2">
            <label htmlFor="mensaje" className="block font-mono text-xs tracking-widest uppercase text-[#5a8fa8] mb-2">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              placeholder="Cuéntame un poco..."
              value={form.mensaje}
              onChange={handleChange}
              className={inputBase + ' resize-none'}
            />
          </div>

          {/* Checkbox política de privacidad */}
          {/* <div className="flex items-start gap-3 sm:col-span-2">
            <button
              type="button"
              role="checkbox"
              aria-checked={agreed}
              onClick={() => setAgreed(!agreed)}
              className={classNames(
                'mt-0.5 relative inline-flex h-5 w-9 shrink-0 rounded-none border transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-[#00c8ff]/50',
                agreed
                  ? 'bg-[#00c8ff]/20 border-[#00c8ff]/60'
                  : 'bg-[#00c8ff]/5 border-[#00c8ff]/20',
              )}
            >
              <span
                className={classNames(
                  'inline-block h-3 w-3 mt-0.5 rounded-none bg-[#00c8ff] transition-transform duration-200',
                  agreed ? 'translate-x-4' : 'translate-x-1',
                )}
              />
            </button>
            <p className="font-mono text-xs text-[#5a8fa8] leading-relaxed">
              Al enviar aceptas la{' '}
              <a href="#" className="text-[#00c8ff] hover:underline underline-offset-2 transition-colors">
                política de privacidad
              </a>
              .
            </p>
          </div> */}
        </div>

        {/* Botón enviar */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!agreed}
            className={classNames(
              'w-full rounded-md px-3.5 py-3 font-mono text-sm tracking-widest uppercase transition-all duration-200 border',
              agreed
                ? 'bg-[#00c8ff]/10 border-[#00c8ff]/50 text-[#00c8ff] hover:bg-[#00c8ff]/20 hover:border-[#00c8ff]'
                : 'bg-transparent border-[#00c8ff]/10 text-[#5a8fa8] cursor-not-allowed',
            )}
          >
            Enviar mensaje →
          </button>
        </div>

        {/* Línea inferior decorativa */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#00c8ff]/10" />
          <span className="font-mono text-xs text-[#5a8fa8]/50 tracking-widest">Tu correo no será compartido con nadie.
</span>
          <div className="h-px flex-1 bg-[#00c8ff]/10" />
        </div>
      </div>
    </section>
  )
}