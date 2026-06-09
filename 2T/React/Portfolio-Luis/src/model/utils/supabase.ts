import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const MOCK_DATA: Record<string, any[]> = {
  cursos: [
    {
      curso_id: '1',
      titulo: 'Administración de Sistemas Linux',
      categoria: 'Sistemas Operativos',
      academia: 'Cisco Networking Academy',
      precio: 199,
    },
    {
      curso_id: '2',
      titulo: 'Seguridad en Redes Empresariales',
      categoria: 'Seguridad',
      academia: 'Google Skill Boost',
      precio: 249,
    },
    {
      curso_id: '3',
      titulo: 'Fundamentos de Ciberseguridad',
      categoria: 'Ciberseguridad',
      academia: 'Universidad Politécnica de Madrid',
      precio: 149,
    },
  ],
  formaciones: [
    {
      formacion_id: '1',
      titulo: 'Técnico Superior en ASIR',
      subtitulo: 'Administración de Sistemas Informáticos en Red',
      descripcion:
        'Formación oficial de FP Superior que abarca administración de sistemas operativos, redes locales, bases de datos y lenguajes de marcas.',
      centro: 'IES Tecnológico',
      estado: 'En curso',
      fecha: '2025-2027',
      imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
      categoria: 'FP Superior',
      autor_nombre: 'Departamento de Informática',
    },
    {
      formacion_id: '2',
      titulo: 'Especialización en Ciberseguridad',
      subtitulo: 'Protección de infraestructuras críticas',
      descripcion:
        'Curso de especialización centrado en auditoría de sistemas, hardening de redes, y respuesta ante incidentes de seguridad.',
      centro: 'Centro de Formación Profesional',
      estado: 'Completado',
      fecha: '2024-2025',
      imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      categoria: 'Certificación',
      autor_nombre: 'INCIBE',
    },
  ],
  servicios: [
    {
      servicio_id: '1',
      nombre: 'Consultoría en Ciberseguridad',
      descripcion:
        'Auditoría completa de seguridad para tu infraestructura tecnológica empresarial.',
      tipo: 'Consultoría',
      precio: 'Consultar presupuesto',
      caracteristicas:
        'Análisis de vulnerabilidades, pruebas de penetración, hardening de sistemas',
      icono: 'FaShieldAlt',
    },
    {
      servicio_id: '2',
      nombre: 'Mantenimiento de Infraestructura IT',
      descripcion:
        'Administración y mantenimiento de servidores y redes corporativas.',
      tipo: 'Soporte',
      precio: 'Desde 50€/h',
      caracteristicas:
        'Monitorización 24/7, gestión de incidencias, backup y recuperación',
      icono: 'FaServer',
    },
    {
      servicio_id: '3',
      nombre: 'Desarrollo Web',
      descripcion:
        'Creación de páginas web modernas y aplicaciones web a medida.',
      tipo: 'Desarrollo',
      precio: 'Consultar presupuesto',
      caracteristicas:
        'React, TypeScript, Tailwind CSS, bases de datos, despliegue en producción',
      icono: 'FaReact',
    },
  ],
  trabajos: [
    {
      trabajo_id: '1',
      titulo: 'Red Local Empresarial',
      descripcion:
        'Diseño e implementación de una red LAN para una PYME con segmentación VLAN, servidor DHCP y DNS, y políticas de acceso.',
      empresa: 'Proyecto Académico ASIR',
      fecha: '2025',
      tecnologias: ['Cisco Packet Tracer', 'VLANs', 'DHCP', 'DNS'],
      enlace: '#',
      imagen: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
    },
    {
      trabajo_id: '2',
      titulo: 'Dashboard de Monitorización',
      descripcion:
        'Panel web para monitorizar el estado de servidores y servicios en tiempo real, con alertas configurables y gráficas históricas.',
      empresa: 'Proyecto Personal',
      fecha: '2025',
      tecnologias: ['React', 'TypeScript', 'Chart.js', 'Node.js'],
      enlace: '#',
      imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    },
    {
      trabajo_id: '3',
      titulo: 'Página Web Corporativa',
      descripcion:
        'Desarrollo de sitio web completo para negocio local con catálogo de productos, formulario de contacto y panel de administración.',
      empresa: 'Freelance',
      fecha: '2024',
      tecnologias: ['React', 'Tailwind CSS', 'Supabase'],
      enlace: '#',
      imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    },
  ],
};

class MockQueryBuilder {
  private tableName: string;
  private isSingleOp = false;
  private filterColumn: string | null = null;
  private filterValue: unknown = null;
  private opType: 'select' | 'insert' | 'update' | 'delete' = 'select';
  private insertData: unknown = null;
  private updateData: Record<string, unknown> | null = null;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(_columns = '*') {
    this.opType = 'select';
    return this;
  }

  insert(data: unknown) {
    this.opType = 'insert';
    this.insertData = data;
    return this;
  }

  delete() {
    this.opType = 'delete';
    return this;
  }

  update(data: Record<string, unknown>) {
    this.opType = 'update';
    this.updateData = data;
    return this;
  }

  eq(column: string, value: unknown) {
    this.filterColumn = column;
    this.filterValue = value;
    return this;
  }

  single() {
    this.isSingleOp = true;
    return this;
  }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ) {
    return Promise.resolve(this.execute()).then(onfulfilled, onrejected);
  }

  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
  ) {
    return Promise.resolve(this.execute()).then(undefined, onrejected);
  }

  finally(onfinally?: (() => void) | null) {
    return Promise.resolve(this.execute()).finally(onfinally!);
  }

  [Symbol.toStringTag] = 'MockQueryBuilder';

  private execute() {
    const rows = MOCK_DATA[this.tableName];

    if (!rows) {
      return {
        data: null,
        error: { message: `Tabla "${this.tableName}" no encontrada en el mock` },
      };
    }

    if (this.opType === 'insert') {
      return { data: this.insertData, error: null };
    }

    if (this.opType === 'update') {
      const col = this.filterColumn;
      const val = this.filterValue;
      if (col && val !== undefined) {
        const target = rows.find((r) => r[col] == val);
        if (target && this.updateData) {
          Object.assign(target, this.updateData);
        }
      }
      return { data: null, error: null };
    }

    if (this.opType === 'delete') {
      return { data: null, error: null };
    }

    let filtered = rows;
    const fc = this.filterColumn;
    const fv = this.filterValue;
    if (fc && fv !== undefined) {
      filtered = rows.filter((r) => r[fc] == fv);
    }

    if (this.isSingleOp) {
      return { data: filtered[0] ?? null, error: null };
    }

    return { data: filtered, error: null };
  }
}

function createMockClient() {
  return {
    from: (tableName: string) => new MockQueryBuilder(tableName),
  };
}

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : createMockClient();
