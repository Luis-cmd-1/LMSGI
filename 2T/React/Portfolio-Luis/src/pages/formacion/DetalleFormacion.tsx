import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { getFormacionById } from "@/model/api/backend/apiFormacion"
import type { IFormacion } from "@/model/interfaces/IFormacion"

export const DetalleFormacion = () => {
  const { id } = useParams()
  const [formacion, setFormacion] = useState<IFormacion | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarFormacion = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      const data = await getFormacionById(id)
      setFormacion(data)
      setLoading(false)
    }

    cargarFormacion()
  }, [id])

  if (loading) {
    return (
      <section className="relative min-h-screen px-6 pt-10 pb-24 lg:px-8">
        <p className="font-mono text-sm text-[#5a8fa8]">Cargando detalle...</p>
      </section>
    )
  }

  if (!formacion) {
    return (
      <section className="relative min-h-screen px-6 pt-10 pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <span className="font-mono text-xs tracking-[4px] uppercase text-[#00c8ff]/70 border border-[#00c8ff]/20 px-3 py-1">
            ./formacion/{id}
          </span>
          <h1 className="mt-6 text-4xl font-bold text-[#00c8ff]">Formacion no encontrada</h1>
          <p className="mt-3 font-mono text-sm text-[#5a8fa8]">
            No existe ninguna formacion con ese identificador.
          </p>
          <Link to="/Formacion" className="mt-8 inline-flex font-mono text-sm text-[#00c8ff] hover:underline">
            Volver a formacion
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen px-6 pt-10 pb-24 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <span className="font-mono text-xs tracking-[4px] uppercase text-[#00c8ff]/70 border border-[#00c8ff]/20 px-3 py-1">
            ./formacion/{formacion.formacion_id}
          </span>
          <h1 className="mt-6 text-4xl font-bold text-[#00c8ff] tracking-tight sm:text-5xl">
            {formacion.titulo}
          </h1>
          <p className="mt-3 max-w-2xl font-mono text-sm leading-6 text-[#5a8fa8]">
            {formacion.subtitulo}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            {formacion.imagen ? (
              <img
                src={formacion.imagen}
                alt={formacion.titulo}
                className="aspect-[4/3] w-full rounded-md border border-[#00c8ff]/20 object-cover shadow-2xl shadow-[#00c8ff]/10"
              />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-md border border-[#00c8ff]/20 bg-[#00c8ff]/5">
                <span className="font-mono text-sm text-[#5a8fa8]">Sin imagen</span>
              </div>
            )}

            <Link
              to="/Formacion"
              className="inline-flex rounded-md border border-[#00c8ff]/25 px-4 py-2 font-mono text-sm text-[#00c8ff] transition hover:border-[#00c8ff]/60 hover:bg-[#00c8ff]/10"
            >
              Volver a formacion
            </Link>
          </div>

          <div className="rounded-md border border-[#00c8ff]/20 bg-[#00c8ff]/5 p-6">
            <h2 className="font-mono text-xl font-bold text-[#e8f4ff]">Detalle completo</h2>

            <div className="mt-6 grid gap-4">
              <DetalleItem label="Titulo" value={formacion.titulo} />
              <DetalleItem label="Subtitulo" value={formacion.subtitulo} />
              <DetalleItem label="Descripcion" value={formacion.descripcion} />
              <DetalleItem label="Centro" value={formacion.centro} />
              <DetalleItem label="Estado" value={formacion.estado} />
              <DetalleItem label="Fecha" value={formacion.fecha} />
              <DetalleItem label="Categoria" value={formacion.categoria} />
              <DetalleItem label="Autor" value={formacion.autor_nombre} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DetalleItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="border-b border-[#00c8ff]/10 pb-3">
      <p className="font-mono text-xs uppercase tracking-[3px] text-[#00c8ff]/70">{label}</p>
      <p className="mt-1 break-words font-mono text-sm leading-6 text-[#c9d8f0]">
        {value || "No indicado"}
      </p>
    </div>
  )
}
