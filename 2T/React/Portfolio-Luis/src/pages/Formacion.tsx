import { useState } from "react";

type ColorKey = "cyan" | "blue" | "green" | "orange";

interface FormacionItem {
  id: number;
  tipo: string;
  titulo: string;
  subtitulo: string;
  centro: string;
  ubicacion: string;
  periodo: string;
  estado: string;
  año?: string;
  descripcion: string;
  skills: string[];
  color: ColorKey;
}

const formacion: FormacionItem[] = [
  {
    id: 1,
    tipo: "FP Superior",
    titulo: "Técnico Superior en ASIR",
    subtitulo: "Administración de Sistemas Informáticos en Red",
    centro: "IES / Centro Formativo",
    ubicacion: "España",
    periodo: "2023 — Actualidad",
    estado: "En curso",
    año: "2º Año",
    descripcion:
      "Formación especializada en administración de sistemas GNU/Linux, Windows Server, redes TCP/IP, virtualización, seguridad, bases de datos y automatización de infraestructura.",
    skills: ["Linux", "Windows Server", "Cisco", "Docker", "VMware", "Active Directory", "SQL", "Python", "Bash"],
    color: "cyan",
  },
  {
    id: 2,
    tipo: "Certificación",
    titulo: "Cisco CCNA (en progreso)",
    subtitulo: "Cisco Certified Network Associate",
    centro: "Cisco Networking Academy",
    ubicacion: "Online",
    periodo: "2024 — Actualidad",
    estado: "En curso",
    descripcion:
      "Preparación para la certificación CCNA. Fundamentos de redes, routing, switching, protocolos TCP/IP, VLANs, STP, OSPF y seguridad de red.",
    skills: ["Routing", "Switching", "VLANs", "OSPF", "ACLs", "NAT"],
    color: "blue",
  },
  {
    id: 3,
    tipo: "Curso",
    titulo: "Administración Linux Avanzada",
    subtitulo: "Linux Server Administration",
    centro: "Plataforma Online",
    ubicacion: "Online",
    periodo: "2023",
    estado: "Completado",
    descripcion:
      "Gestión de servidores Linux, scripting Bash avanzado, gestión de procesos, usuarios, permisos, redes y servicios como SSH, Apache y Nginx.",
    skills: ["Bash", "SSH", "Nginx", "Apache", "Cron", "Permisos"],
    color: "green",
  },
  {
    id: 4,
    tipo: "Curso",
    titulo: "Docker & Contenedores",
    subtitulo: "Containerization & DevOps",
    centro: "Plataforma Online",
    ubicacion: "Online",
    periodo: "2024",
    estado: "Completado",
    descripcion:
      "Contenedores Docker, imágenes, volúmenes, redes Docker, Docker Compose y orquestación básica. Despliegue de aplicaciones en entornos contenedorizados.",
    skills: ["Docker", "Docker Compose", "Dockerfile", "Networks"],
    color: "orange",
  },
];

const colorMap: Record<ColorKey, { border: string; text: string; bg: string; badgeBorder: string; skillBg: string }> = {
  cyan: {
    border: "border-[rgba(0,200,255,0.5)]",
    text: "text-[#00c8ff]",
    bg: "bg-[rgba(0,200,255,0.06)]",
    badgeBorder: "border-[rgba(0,200,255,0.3)]",
    skillBg: "bg-[rgba(0,200,255,0.04)] border-[rgba(0,200,255,0.2)] text-[#8ab4cc]",
  },
  blue: {
    border: "border-[rgba(60,140,255,0.5)]",
    text: "text-[#3c8cff]",
    bg: "bg-[rgba(60,140,255,0.06)]",
    badgeBorder: "border-[rgba(60,140,255,0.3)]",
    skillBg: "bg-[rgba(60,140,255,0.04)] border-[rgba(60,140,255,0.2)] text-[#8ab0e8]",
  },
  green: {
    border: "border-[rgba(0,212,106,0.5)]",
    text: "text-[#00d46a]",
    bg: "bg-[rgba(0,212,106,0.06)]",
    badgeBorder: "border-[rgba(0,212,106,0.3)]",
    skillBg: "bg-[rgba(0,212,106,0.04)] border-[rgba(0,212,106,0.2)] text-[#7dcca0]",
  },
  orange: {
    border: "border-[rgba(255,160,50,0.5)]",
    text: "text-[#ffa032]",
    bg: "bg-[rgba(255,160,50,0.06)]",
    badgeBorder: "border-[rgba(255,160,50,0.3)]",
    skillBg: "bg-[rgba(255,160,50,0.04)] border-[rgba(255,160,50,0.2)] text-[#d4a870]",
  },
};

interface CardProps {
  item: FormacionItem;
}

function FormacionCard({ item }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const c = colorMap[item.color];

  return (
    <div className={`border ${c.border} ${c.bg} p-5 transition-all`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-mono text-[10px] tracking-[2px] uppercase px-2 py-0.5 border ${c.badgeBorder} ${c.text}`}>
            {item.tipo}
          </span>
          {item.año && (
            <span className="font-mono text-[10px] tracking-[2px] uppercase px-2 py-0.5 border border-[rgba(0,200,255,0.15)] text-[#5a8fa8]">
              {item.año}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className={`w-1.5 h-1.5 rounded-full ${item.estado === "Completado" ? "bg-[#5a8fa8]" : "bg-[#00d46a] animate-pulse"}`}
          />
          <span className={`font-mono text-[10px] tracking-widest ${item.estado === "Completado" ? "text-[#5a8fa8]" : "text-[#3d7a5a]"}`}>
            {item.estado.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className={`text-lg font-bold leading-tight tracking-tight ${c.text} mb-0.5`}>
        {item.titulo}
      </h3>
      <p className="font-mono text-[11px] text-[#5a8fa8] mb-3">{item.subtitulo}</p>

      {/* Meta */}
      <p className="font-mono text-[11px] text-[#3d5a72] mb-4">
        // {item.centro} · {item.ubicacion} · {item.periodo}
      </p>

      {/* Expandable description */}
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-40 mb-4" : "max-h-0"}`}>
        <p className="text-sm text-[#7fa8c0] leading-relaxed border-l border-[rgba(0,200,255,0.2)] pl-3">
          {item.descripcion}
        </p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {item.skills.map((s) => (
          <span key={s} className={`font-mono text-[10px] px-2 py-0.5 border ${c.skillBg}`}>
            {s}
          </span>
        ))}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`font-mono text-[10px] tracking-[2px] uppercase ${c.text} opacity-50 hover:opacity-100 transition-opacity`}
      >
        {expanded ? "[ — ocultar ]" : "[ + ver más ]"}
      </button>
    </div>
  );
}

export const Formacion = () => {
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
          // FORMACIÓN · EDUCACIÓN · CERTIFICACIONES
        </span>

        <h1 className="text-6xl font-bold leading-none tracking-tight text-[#e8f4ff] mb-4">
          <span className="text-[#00c8ff]">Formación</span>
        </h1>

        <p className="text-base text-[#7fa8c0] max-w-lg leading-relaxed">
          Estudios académicos, certificaciones técnicas y cursos especializados
          en administración de sistemas, redes e infraestructura.
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
            { num: "2+",  label: "Años formación" },
            { num: "1+",  label: "Certificaciones" },
            { num: "5+",  label: "Cursos"          },
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

      {/* ── CARDS ──────────────────────────────────────── */}
      <section className="px-10 py-8">
        <h2 className="font-mono text-[11px] tracking-[3px] text-[#00c8ff] uppercase mb-5 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-[rgba(0,200,255,0.2)]">
          Historial académico
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {formacion.map((item) => (
            <FormacionCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="h-px mx-10 bg-gradient-to-r from-transparent via-[rgba(0,200,255,0.3)] to-transparent" />
      <div className="px-10 py-6 text-center">
        <p className="font-mono text-[10px] tracking-[3px] text-[#2a4a62]">
          // APRENDIZAJE CONTINUO · EN CONSTANTE ACTUALIZACIÓN
        </p>
      </div>

    </div>
  );
};