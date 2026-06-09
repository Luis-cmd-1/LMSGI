export const Home = () => {
    return (
<div className="relative min-h-screen bg-[#050d1a] text-[#c9d8f0] font-sans overflow-hidden">
 
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,200,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
 
      {/* Scan line animation */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,200,255,0.4)] to-transparent pointer-events-none animate-[scan_4s_linear_infinite]" />
 
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative px-10 pt-16 pb-10">
        {/* Corner decorations */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00c8ff]" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00c8ff]" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#00c8ff]" />
 
        {/* Status */}
        <div className="flex items-center gap-2 mb-4 font-mono text-[11px] text-[#3d7a5a] tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d46a] animate-pulse" />
          DISPONIBLE · ESPAÑA
        </div>
 
        {/* Badge */}
        <span className="inline-block font-mono text-[11px] text-[#00c8ff] border border-[rgba(0,200,255,0.3)] px-3 py-1 mb-3 tracking-[3px]">
          // ASIR · SYSADMIN · NETWORKS
        </span>
 
        {/* Name */}
        <h1 className="text-6xl font-bold leading-none text-[#e8f4ff] tracking-tight mb-1">
           <span className="text-[#00c8ff]">Luis Miguel</span>
        </h1>
 
        {/* Role */}
        {/* <p className="font-mono text-sm text-[#5a8fa8] tracking-widest mb-5">
          $ whoami → estudiante_asir --ciclo=superior
        </p> */}
 
        {/* Description */}
        <p className="text-base text-[#7fa8c0] max-w-lg leading-relaxed mb-8">
          Estudiante de Administración de Sistemas Informáticos en Red.
          Apasionado por las redes, los servidores Linux y la automatización
          de infraestructura.
        </p>
 
        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button className="font-mono text-xs tracking-[2px] uppercase px-6 py-2.5 border border-[#00c8ff] text-[#00c8ff] bg-transparent hover:bg-[rgba(0,200,255,0.1)] transition-colors">
            Ver proyectos
          </button>
          <button className="font-mono text-xs tracking-[2px] uppercase px-6 py-2.5 border border-[rgba(90,143,168,0.4)] text-[#5a8fa8] bg-transparent hover:border-[rgba(90,143,168,0.8)] hover:text-[#8ab4cc] transition-colors">
            Contactar
          </button>
        </div>
      </section>
 
      {/* Divider */}
      <div className="h-px mx-10 bg-gradient-to-r from-transparent via-[rgba(0,200,255,0.3)] to-transparent" />
 
      {/* ── STACK ────────────────────────────────────────── */}
      <section className="px-10 py-8">
        <h2 className="font-mono text-[11px] tracking-[3px] text-[#00c8ff] uppercase mb-5 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-[rgba(0,200,255,0.2)]">
          Stack técnico
        </h2>
 
        <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2">
          {[
            { label: "Linux",           highlight: false  },
            { label: "Cisco",           highlight: true  },
            { label: "Windows Server",  highlight: false },
            { label: "Docker",          highlight: false },
            { label: "Bash",            highlight: false },
            { label: "Python",          highlight: false },
            { label: "VMware",          highlight: false },
            { label: "Active Directory",highlight: false },
            { label: "SQL",             highlight: false },
            { label: "Tailwind",        highlight: false },
          ].map(({ label, highlight }) => (
            <div
              key={label}
              className={`
                text-center text-[13px] font-semibold py-2 px-3 border transition-all cursor-default
                ${highlight
                  ? "border-[rgba(0,200,255,0.5)] text-[#00c8ff] bg-[rgba(0,200,255,0.06)]"
                  : "border-[rgba(0,200,255,0.2)] text-[#8ab4cc] bg-[rgba(0,200,255,0.03)] hover:border-[rgba(0,200,255,0.6)] hover:text-[#00c8ff] hover:bg-[rgba(0,200,255,0.08)]"
                }
              `}
            >
              {label}
            </div>
          ))}
        </div>
      </section>
 
      {/* ── STATS ────────────────────────────────────────── */}
      <section className="px-10 pb-12">
        <h2 className="font-mono text-[11px] tracking-[3px] text-[#00c8ff] uppercase mb-5 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-[rgba(0,200,255,0.2)]">
          Stats
        </h2>
 
        <div className="grid grid-cols-3 gap-3">
          {[
            { num: "2°",  label: "Año ASIR"   },
            { num: "12+", label: "Prácticas"  },
            { num: "5+",  label: "Proyectos"  },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="bg-[rgba(0,200,255,0.04)] border border-[rgba(0,200,255,0.15)] py-5 text-center"
            >
              <div className="font-mono text-3xl text-[#00c8ff]">{num}</div>
              <div className="text-xs text-[#5a8fa8] tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>    )
}