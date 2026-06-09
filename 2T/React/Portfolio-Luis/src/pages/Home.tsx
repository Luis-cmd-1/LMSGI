import { Link } from "react-router-dom"

const stats = [
  { value: "ASIR", label: "Sistemas y redes" },
  { value: "React", label: "Front-end moderno" },
  { value: "Linux", label: "Administracion" },
]

const skills = [
  {
    title: "Sistemas",
    detail: "Windows Server, Linux, usuarios, permisos, servicios y mantenimiento.",
  },
  {
    title: "Redes",
    detail: "Subnetting, VLANs, routing, switching y configuracion Cisco.",
  },
  {
    title: "Desarrollo",
    detail: "React, TypeScript, Vite, Tailwind CSS y conexion con APIs.",
  },
  {
    title: "Bases de datos",
    detail: "SQL, PostgreSQL, modelado relacional y consultas estructuradas.",
  },
]

const quickLinks = [
  {
    title: "Formacion",
    description: "Estudios, cursos y certificaciones tecnicas.",
    to: "/Formacion",
  },
  {
    title: "Servicios",
    description: "Soluciones de desarrollo, sistemas e infraestructura.",
    to: "/servicios",
  },
  {
    title: "Trabajos",
    description: "Proyectos destacados y practicas realizadas.",
    to: "/Trabajos",
  },
  
]

export default function Home() {
  return (
    <section className="relative overflow-hidden px-6 py-14 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 " />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex border border-[#00c8ff]/20 px-3 py-1 font-mono text-xs uppercase tracking-[4px] text-[#00c8ff]/70">
            ./home
          </span>

          <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-[#e8f4ff] sm:text-6xl">
            Hola, soy <span className="text-[#00c8ff]">Luis</span>
          </h1>

          <p className="mt-5 max-w-2xl font-mono text-sm leading-7 text-[#5a8fa8] sm:text-base">
            Estudiante de Administracion de Sistemas Informaticos en Red, centrado
            en redes, Linux, virtualizacion y desarrollo web  .
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/Trabajos"
              className="inline-flex items-center justify-center rounded-md border border-[#00c8ff] bg-[#00c8ff] px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-[#050d1a] transition hover:bg-transparent hover:text-[#00c8ff]"
            >
              Ver trabajos
            </Link>
            <Link
              to="/Contacto"
              className="inline-flex items-center justify-center rounded-md border border-[#00c8ff]/25 px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-[#00c8ff] transition hover:border-[#00c8ff]/60 hover:bg-[#00c8ff]/10"
            >
              Contactar
            </Link> 
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 border-y border-[#00c8ff]/15">
            {stats.map((stat) => (
              <div key={stat.label} className="py-5 pr-4">
                <p className="font-mono text-xl font-bold text-[#00c8ff]">{stat.value}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[#5a8fa8]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 border border-[#00c8ff]/10 bg-[#00c8ff]/5" />
          <img
            src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*NJSv6DGoKTloI8d8im98zg.png"
            alt="Espacio de trabajo tecnologico"
            className="aspect-[4/3] w-full rounded-md border border-[#00c8ff]/20 object-cover shadow-2xl shadow-[#00c8ff]/10"
          />
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[3px] text-[#5a8fa8]">
            Accesos rapidos
          </span>
          <div className="h-px flex-1 bg-[#00c8ff]/15" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="group rounded-md border border-[#00c8ff]/20 bg-[#050d1a]/70 p-6 transition hover:border-[#00c8ff]/60 hover:bg-[#00c8ff]/5"
            >
              <h2 className="font-mono text-lg font-bold text-[#e8f4ff] group-hover:text-[#00c8ff]">
                {item.title}
              </h2>
              <p className="mt-3 font-mono text-sm leading-6 text-[#5a8fa8]">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl pb-8">
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-[4px] text-[#00c8ff]/70">
            // stack tecnico
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#00c8ff]">Habilidades</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <article
              key={skill.title}
              className="rounded-md border border-[#00c8ff]/20 bg-[#07101e] p-5"
            >
              <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[#00c8ff]">
                {skill.title}
              </h3>
              <p className="mt-4 font-mono text-sm leading-6 text-[#7a99b0]">
                {skill.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
