
// Contenido de cada caracter en este caso contenido de la pagina contacto
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function Contacto() {
  return (
    <div id='contacto' className="relative isolate bg-slate-950 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Título Principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Contacto</h2>
          <p className="mt-2 text-lg/8 text-gray-400">Alguna web que crear ¡ Escríbeme !</p>
        </div>
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
          
          {/* Columna izquierda: Información de contacto */}
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold tracking-tight text-white">Mi Información</h3>
            <p className="mt-4 text-lg text-gray-400">
            </p>
            
            <div className="mt-10 space-y-6 text-base text-gray-300">
              <div className="flex gap-x-4">
                <div className="flex-none">
                  <span className="sr-only">Dirección</span>
                  <MapPinIcon className="h-7 w-6 text-indigo-400" />
                </div>
                <h1>Almería-España</h1>
              </div>
              <div className="flex gap-x-4">
                <div className="flex-none">
                  <span className="sr-only">Teléfono</span>
                  <PhoneIcon className="h-7 w-6 text-indigo-400"  />
                </div>
                <div>
                  <a className="hover:text-white transition">
                    +34 634 415 808
                  </a>
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon className="h-7 w-6 text-indigo-400"  />
                </div>
                <div>
                  <a className="hover:text-white transition" >
                    guillem@gespou.es
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/*Forom */}
          <form action="https://formspree.io/f/mlgpejyo" className="bg-white/5 p-8 rounded-2xl ring-1 ring-white/10">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <h1 className="block text-sm font-semibold text-white">Nombre</h1>
                <input
                  type="text"
                  name="name"
                  id="first-name"
                  className="mt-2.5 block w-full rounded-md bg-white/5 px-3.5 py-2 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <h1 className="block text-sm font-semibold text-white">Apellido</h1>
                <input
                  type="text"
                  name="lastname"
                  id="last-name"
                  className="mt-2.5 block w-full rounded-md bg-white/5 px-3.5 py-2 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <h1 className="block text-sm font-semibold text-white">Email</h1>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-2.5 block w-full rounded-md bg-white/5 px-3.5 py-2 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <h1 className="block text-sm font-semibold text-white">Mensaje</h1>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="mt-2.5 block w-full rounded-md bg-white/5 px-3.5 py-2 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition"
              >
                Enviar mensaje
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}