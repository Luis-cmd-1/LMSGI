interface Servicio {
  id: number;
  codigo: string;
  titulo: string;
  descripcion: string;
  skills: string[];
  disponible: boolean;
}

const servicios: Servicio[] = [
  {
    id: 1,
    codigo: "SRV-01",
    titulo: "Administración de Servidores Linux",
    descripcion:
      "Instalación, configuración y mantenimiento de servidores GNU/Linux. Gestión de usuarios, permisos, servicios y monitorización del sistema.",
    skills: ["Ubuntu", "Debian", "SSH", "Nginx", "Apache", "Cron", "Systemd"],
    disponible: true,
  },
  {
    id: 2,
    codigo: "SRV-02",
    titulo: "Configuración de Redes",
    descripcion:
      "Diseño y configuración de redes LAN/WAN. Configuración de switches, routers Cisco, VLANs, routing estático y dinámico.",
    skills: ["Cisco IOS", "VLANs", "OSPF", "STP", "ACLs", "NAT", "TCP/IP"],
    disponible: true,
  },
  {
    id: 3,
    codigo: "SRV-03",
    titulo: "Virtualización e Infraestructura",
    descripcion:
      "Despliegue y gestión de entornos virtualizados con VMware y contenedores Docker. Configuración de redes virtuales y almacenamiento.",
    skills: ["VMware", "Docker", "Docker Compose", "Redes virtuales"],
    disponible: true,
  },
  {
    id: 4,
    codigo: "SRV-04",
    titulo: "Scripting y Automatización",
    descripcion:
      "Automatización de tareas repetitivas mediante scripts Bash y Python. Backups automáticos, monitorización y gestión de logs.",
    skills: ["Bash", "Python", "Cron", "Logs", "Backups"],
    disponible: true,
  },
  {
    id: 5,
    codigo: "SRV-05",
    titulo: "Active Directory & Windows Server",
    descripcion:
      "Instalación y configuración de Windows Server. Gestión de dominios, usuarios, políticas de grupo (GPO) y Active Directory.",
    skills: ["Windows Server", "Active Directory", "GPO", "DNS", "DHCP"],
    disponible: false,
  },
  {
    id: 6,
    codigo: "SRV-06",
    titulo: "Seguridad y Bastionado",
    descripcion:
      "Hardening de sistemas Linux y Windows. Configuración de firewalls, análisis de vulnerabilidades y buenas prácticas de seguridad.",
    skills: ["iptables", "UFW", "fail2ban", "Nmap", "Hardening"],
    disponible: false,
  },
];

export const Servicios = () => {
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


      {/* Scan line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,200,255,0.4)] to-transparent pointer-events-none animate-[scan_4s_linear_infinite]" />

      {/* ── HEADER ─────────────────────────────────────── */}
      <section className="relative px-10 pt-16 pb-10">
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00c8ff]" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00c8ff]" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#00c8ff]" />

        <span className="inline-block font-mono text-[11px] text-[#00c8ff] border border-[rgba(0,200,255,0.3)] px-3 py-1 mb-4 tracking-[3px]">
          // SERVICIOS · SYSADMIN · NETWORKS
        </span>

        <h1 className="text-6xl font-bold leading-none tracking-tight text-[#e8f4ff] mb-4">
          <span className="text-[#00c8ff]">Servicios</span>
        </h1>

        <p className="text-base text-[#7fa8c0] max-w-lg leading-relaxed">
          Áreas de trabajo y servicios técnicos en administración de sistemas,
          redes e infraestructura. Disponible para proyectos y colaboraciones.
        </p>
      </section>

      {/* Divider */}
      <div className="h-px mx-10 bg-gradient-to-r from-transparent via-[rgba(0,200,255,0.3)] to-transparent" />

      {/* ── STATS ──────────────────────────────────────── */}
      <section className="px-10 py-8">
        <h2 className="font-mono text-[11px] tracking-[3px] text-[#00c8ff] uppercase mb-5 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-[rgba(0,200,255,0.2)]">
          Stats
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { num: "6",   label: "Servicios"     },
            { num: "4",   label: "Disponibles"   },
            { num: "2+",  label: "Años exp."     },
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

      {/* Divider */}
      <div className="h-px mx-10 bg-gradient-to-r from-transparent via-[rgba(0,200,255,0.3)] to-transparent" />

      {/* ── SERVICIOS GRID ─────────────────────────────── */}
      <section className="px-10 py-8 pb-12">
        <h2 className="font-mono text-[11px] tracking-[3px] text-[#00c8ff] uppercase mb-5 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-[rgba(0,200,255,0.2)]">
          Catálogo de servicios
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {servicios.map((srv) => (
            <div
              key={srv.id}
              className={`
                border p-5 transition-all group
                ${srv.disponible
                  ? "border-[rgba(0,200,255,0.2)] bg-[rgba(0,200,255,0.03)] hover:border-[rgba(0,200,255,0.5)] hover:bg-[rgba(0,200,255,0.06)]"
                  : "border-[rgba(90,143,168,0.15)] bg-[rgba(90,143,168,0.02)] opacity-60"
                }
              `}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] tracking-[2px] text-[#3d5a72]">
                  {srv.codigo}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${srv.disponible ? "bg-[#00d46a] animate-pulse" : "bg-[#3d5a72]"}`}
                  />
                  <span
                    className={`font-mono text-[10px] tracking-widest uppercase ${srv.disponible ? "text-[#3d7a5a]" : "text-[#3d5a72]"}`}
                  >
                    {srv.disponible ? "Disponible" : "Próximamente"}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3
                className={`text-base font-bold tracking-tight mb-2 transition-colors ${
                  srv.disponible
                    ? "text-[#e8f4ff] group-hover:text-[#00c8ff]"
                    : "text-[#5a8fa8]"
                }`}
              >
                {srv.titulo}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#7fa8c0] leading-relaxed mb-4">
                {srv.descripcion}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {srv.skills.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] px-2 py-0.5 border border-[rgba(0,200,255,0.2)] bg-[rgba(0,200,255,0.04)] text-[#8ab4cc]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px mx-10 bg-gradient-to-r from-transparent via-[rgba(0,200,255,0.3)] to-transparent" />

      {/* CTA */}
      <section className="px-10 py-10 text-center">
        <p className="text-base text-[#7fa8c0] mb-6">
          ¿Tienes un proyecto en mente? Hablemos.
        </p>
        <button className="font-mono text-xs tracking-[2px] uppercase px-8 py-3 border border-[#00c8ff] text-[#00c8ff] bg-transparent hover:bg-[rgba(0,200,255,0.1)] transition-colors">
          Contactar
        </button>
      </section>

    </div>
  );
};