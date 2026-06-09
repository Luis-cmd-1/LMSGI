# Explicación Técnica del Portfolio

> Documento pensado para que puedas explicar tu proyecto ante un tribunal, aunque no sepa nada de programación.

---

## 1. ¿Qué es este proyecto?

Es una **página web personal (portfolio)** que he creado para mostrar mis estudios, servicios, cursos y proyectos como estudiante de ASIR (Administración de Sistemas Informáticos en Red).

La web funciona como un **catálogo online** donde cualquiera puede ver mi perfil técnico, los cursos que he realizado, los servicios que ofrezco y los proyectos en los que he trabajado. Toda la información se carga desde Supabase (una base de datos en la nube), pero el proyecto incluye un sistema **mock** que genera datos ficticios realistas para que la web funcione aunque no haya conexión a la base de datos real.

Está construida con **React** (una librería moderna de JavaScript para hacer interfaces de usuario), **TypeScript** (un "superconjunto" de JavaScript que evita errores), **Vite** (una herramienta que hace que el desarrollo sea muy rápido) y se conecta a **Supabase** (base de datos en la nube). Para los estilos usa **Tailwind CSS** y para animaciones **Framer Motion**.

---

## 2. ¿Cómo arranca la aplicación?

### Paso a paso, desde que escribes la URL hasta que ves la página

#### 1. El navegador pide el `index.html`

Cuando alguien escribe la URL de la web, el servidor envía el archivo `index.html` que está en la raíz del proyecto:

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>Aaron - Full Stack Developer</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Explicación:** Es un HTML mínimo. Lo importante es que hay un `<div id="root">` vacío, y al final se carga un archivo JavaScript (`main.tsx`). Ese archivo es el que va a construir toda la página desde cero.

#### 2. `main.tsx` — El punto de entrada

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Explicación:**
- `createRoot(document.getElementById('root')!)` — Localiza el `<div id="root">` del HTML y le dice a React: "aquí es donde tienes que trabajar".
- `.render(<App />)` — Le dice a React: "dentro de ese div, renderiza (pinta) el componente `App`".
- `<StrictMode>` — Es un modo de desarrollo que ayuda a detectar errores. No afecta a la web final.

#### 3. `App.tsx` — El componente principal y el enrutador

```tsx
// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// ... importaciones de páginas ...

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        <Navbar />
        <main className="grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre-mi" element={<SobreMi />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/servicios/:id" element={<ServicioDetalle />} />
            <Route path="/cursos" element={<Cursos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
```

**Explicación:** `App` es el componente raíz. Define el enrutador (`BrowserRouter`) y dentro de él coloca el `Navbar` (arriba), las rutas (en el medio) y el `Footer` (abajo). Cuando cambias de URL, React Router detecta el cambio y renderiza el componente correspondiente dentro de `<Routes>`, sin recargar toda la página.

---

## 3. El sistema de rutas (React Router)

### ¿Qué es un router y para qué sirve?

Imagina que tu web es un **edificio de varias habitaciones**. El router es el **índice de puertas** que hay en la entrada: te dice qué hay detrás de cada puerta y te lleva allí sin tener que salir del edificio. En una web sin router, cada vez que cambias de página el navegador recarga todo. Con React Router, solo se cambia la parte que toca — es más rápido y suave.

### Rutas definidas en `App.tsx`

A diferencia de otros proyectos que separan las rutas en un archivo aparte (`AppRouter.tsx`), aquí las rutas están directamente en `App.tsx`:

| Ruta | Componente | ¿Qué muestra? |
|------|-----------|---------------|
| `/` | `Home` | Página principal con héroe, marquee de tecnologías y pilares estratégicos |
| `/sobre-mi` | `SobreMi` | Perfil técnico, formación y stack tecnológico en diseño Bento |
| `/servicios` | `Servicios` | Lista de servicios ofrecidos (desde Supabase) |
| `/servicios/:id` | `ServicioDetalle` | Detalle de un servicio concreto (desde Supabase) |
| `/proyectos` | `Proyectos` | Proyectos realizados (desde Supabase) |
| `/cursos` | `Cursos` | Cursos y certificaciones (desde Supabase) |
| `/contacto` | `Contacto` | Formulario de contacto e información de contacto (desde Supabase) |

**Nota:** La ruta comodín `path="*"` (página 404) **no está implementada**. Si se navega a una URL que no existe, React Router no encontrará ninguna ruta y no se mostrará nada en el `<main>`, pero la página no se rompe.

---

## 4. Cada página explicada individualmente

### 4.1. Home (`src/pages/Home.tsx`) — Página principal

**¿Qué muestra?**
- Una sección **Hero** con el nombre "AARON" animado con efecto de máquina de escribir (`typewriter-effect`).
- Un indicador "Status: System Online" con un punto rojo parpadeante.
- Una descripción: "Estudiante de 1º ASIR enfocado en la gestión de infraestructuras críticas..."
- Dos botones: "Explorar Proyectos" (enlaza a `/proyectos`) y "Ver Certificaciones" (enlaza a `/cursos`).
- Una **imagen decorativa** (`/cyber_server_red.png`) con un overlay técnico que simula un monitor de red (Status: Red Segura, Ping: 14ms).
- Un **marquee infinito** con tecnologías (Linux, Windows Server, Cisco, Virtualización, Docker, Ciberseguridad...).
- Una sección de **3 Pilares Estratégicos** en diseño Bento (Infraestructura, Seguridad, Soporte).
- Un **mini-dashboard** con 4 stats (1º Año ASIR, 5+ Proyectos, 8+ Tecnologías, 100% Motivación).

**¿Qué datos usa?**
- Todos los datos están escritos **directamente en el código** (hardcodeados). No hay llamadas a Supabase.
- Las animaciones usan **Framer Motion** para las transiciones y **Typewriter** para el efecto de escritura.
- El marquee usa una **animación CSS personalizada** (`@keyframes marquee`).

### 4.2. Sobre Mí (`src/pages/SobreMi.tsx`)

**¿Qué muestra?**
- Un diseño **Bento Grid** de 4 paneles:
  1. **Perfil Técnico** (2 columnas): Descripción personal con mención a ASIR y botón de descarga de CV.
  2. **Formación** (1 columna): Línea temporal con "Técnico Superior en ASIR".
  3. **Stack Tecnológico** (2 columnas): 6 tarjetas con iconos (Linux, Win Server, Redes Cisco, Virtualización, Bases de Datos, Frontend).
  4. **Métricas** (1 columna): Stats (1º ASIR, +5 Proyectos, +8 Tecnologías, 100% Motivación).

**¿Qué datos usa?**
- Todos hardcodeados en el propio componente. No hay llamadas a Supabase.
- Los iconos son de la librería `react-icons` (FaServer, FaNetworkWired, FaLinux, etc.).

**¿Qué hace el botón "Descargar CV"?**
- Descarga el archivo `/CV_Aaron_Cruz_Medrano.pdf` que está en la carpeta `public/` del proyecto.

### 4.3. Servicios (`src/pages/Servicios.tsx`)

**¿Qué muestra?**
- Una cuadrícula de tarjetas de servicio, cada una con:
  - Imagen del servicio.
  - Nombre del servicio.
  - Descripción breve.
  - Botón "Ver más detalles" que enlaza a `/servicios/:id`.

**¿Qué datos usa y de dónde vienen?**

```tsx
useEffect(() => {
  const fetchServicios = async () => {
    const { data } = await supabase.from('Servicios').select('*');
    if (data) setServicios(data);
    setLoading(false);
  };
  fetchServicios();
}, []);
```

**Explicación:** Al cargar la página, se ejecuta `useEffect` que llama a Supabase para obtener todos los servicios de la tabla `Servicios`. Mientras carga, muestra un spinner animado. Si no hay datos, se muestra una cuadrícula vacía.

### 4.4. ServicioDetalle (`src/pages/ServicioDetalle.tsx`)

**¿Qué muestra?**
- La página de detalle de un servicio individual. Recibe el `id` del servicio desde la URL (ej: `/servicios/1`).
- Muestra: nombre, descripción entre comillas, detalles técnicos en un recuadro destacado, imagen a tamaño completo.

**¿Qué datos usa y de dónde vienen?**

```tsx
const { id } = useParams<{ id: string }>();

useEffect(() => {
  const fetchServicio = async () => {
    const { data, error } = await supabase
      .from('Servicios')
      .select('*')
      .eq('id', id)
      .single();
    if (!error) setServicio(data);
  };
  fetchServicio();
}, [id]);
```

**Explicación:** Usa `useParams` para obtener el `id` de la URL. Luego consulta Supabase filtrando por ese ID con `.eq('id', id).single()`. Como el resultado se espera que sea un único objeto (no un array), se usa `.single()`. Mientras carga, muestra "Cargando especificaciones...".

### 4.5. Proyectos (`src/pages/Proyectos.tsx`)

**¿Qué muestra?**
- Una cuadrícula de tarjetas de proyecto, cada una con:
  - Imagen de fondo a pantalla completa.
  - Nombre del proyecto.
  - Descripción.
  - Botón "Ver proyecto" que abre el enlace en una pestaña nueva.

**¿Qué datos usa y de dónde vienen?**

Usa el **service layer** (`proyectoService.ts`):

```tsx
// src/services/proyectoService.ts
export const obtenerProyectos = async () => {
  const { data, error } = await supabase.from('Proyectos').select('*');
  if (error) throw error;
  return { data, error: null };
};
```

La página llama a `obtenerProyectos()` y maneja el error:

```tsx
const { data, error } = await obtenerProyectos();
if (error) {
  console.error("Error de conexión:", error.message || error);
} else {
  setProyectos(data || []);
}
```

Si no hay proyectos (error o datos vacíos), muestra: "No hay proyectos disponibles en la base de datos. Revisa el RLS en Supabase".

### 4.6. Cursos (`src/pages/Cursos.tsx`)

**¿Qué muestra?**
- Una cuadrícula de tarjetas de curso con diseño **glassmorphism** (efecto de cristal esmerilado).
- Cada tarjeta tiene: badge de medalla, logo de la institución, nombre de la institución, fecha, nombre del curso, descripción entre comillas, y botón "Validar Credencial" con efecto de relleno.
- Animaciones con **Framer Motion**: las tarjetas aparecen con escalado y retardo progresivo.

**¿Qué datos usa y de dónde vienen?**

```tsx
// src/services/cursoService.ts
export const obtenerCursos = async () => {
  const { data, error } = await supabase
    .from('Cursos')
    .select('*')
    .order('id', { ascending: false });
  if (error) throw error;
  return { data, error: null };
};
```

Usa `.order('id', { ascending: false })` para mostrar los cursos más recientes primero.

### 4.7. Contacto (`src/pages/Contacto.tsx`)

**¿Qué muestra?**
- Un formulario de contacto completo con campos: Nombre, Email, Asunto (desplegable con 4 opciones), y Mensaje.
- Si se selecciona "Reserva de Cita", aparecen campos adicionales de Fecha y Hora.
- Información de contacto obtenida de Supabase: email personal con enlace a Gmail, dirección con mapa de Google Maps embebido.

**¿Qué datos usa y de dónde vienen?**

**Lectura (información de contacto):**
```tsx
const { data, error } = await supabase
  .from('Informacion_Contacto')
  .select('*')
  .single();
```

**Escritura (guardar mensaje):**
```tsx
const { error } = await supabase
  .from('Mensaje_Contacto')
  .insert([{ nombre, email, mensaje: mensajeFinal }]);
```

Además, después de guardar el mensaje en Supabase, envía una **alerta a Telegram** usando la API de Telegram:

```tsx
await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ chat_id: chatId, text: telegramText })
});
```

**Nota:** El envío a Telegram requiere las variables de entorno `VITE_TELEGRAM_BOT_TOKEN` y `VITE_TELEGRAM_CHAT_ID`. Si no están configuradas, simplemente se registra una advertencia en consola pero el mensaje se guarda igualmente en Supabase.

---

## 5. Los componentes reutilizables

### 5.1. Navbar (`src/components/Navbar.tsx`)

**¿Para qué sirve?** Barra de navegación superior. Aparece en todas las páginas.

**¿Qué hace?**
- Muestra 6 enlaces de navegación: Inicio, Sobre mi, Cursos, Servicios, Proyectos y Contacto.
- Resalta con color rojo el enlace de la página actual (gracias a `useLocation()`).
- En móvil, los enlaces se ocultan y aparece un botón de "hamburguesa" que despliega un menú animado con Framer Motion.
- Tiene un logo con icono de terminal y el nombre "AaronMCM" con el texto "SysAdmin · Dev".
- Botón "Descargar CV" para escritorio.
- El logo tiene un punto verde parpadeante que simula "servidor activo".

### 5.2. Footer (`src/components/Footer.tsx`)

**¿Para qué sirve?** Pie de página que aparece en todas las páginas.

**¿Qué muestra?**
- Marca con logo de terminal y nombre.
- Enlaces rápidos a Proyectos, Cursos y Contacto.
- Iconos de redes sociales: GitHub (`https://github.com/AaronCM2705`), LinkedIn y Email.
- Copyright con año dinámico: `© 2026 Aaron Cruz Medrano`.
- Texto: "1º ASIR - Lenguaje de Marcas".

---

## 6. La conexión con Supabase y el sistema Mock ⭐⭐

### ¿Qué es Supabase?

Imagina que tienes una **hoja de cálculo de Excel guardada en la nube**, pero con superpoderes: en lugar de tener que abrir Excel y editarla manualmente, tu web puede **leer y escribir datos** mediante simples llamadas desde el código. Eso es Supabase.

### ¿Cómo se inicializa el cliente?

```tsx
// src/supabase/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ... (sistema Mock explicado abajo) ...

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : createMockClient();
```

### El sistema Mock (simulador de base de datos)

**¿Qué es un Mock?** Es un simulacro. En lugar de depender de una base de datos real en internet (que puede no estar disponible), he creado un sistema que **finge** tener los datos. Así la web funciona aunque no haya conexión a Supabase.

**¿Cómo funciona?** El `supabaseClient.ts` comprueba si existen las variables de entorno `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`:
- Si **existen**: usa el cliente real de Supabase (se conecta a la base de datos en la nube).
- Si **no existen**: usa un cliente simulado (mock) que devuelve datos ficticios.

### Datos ficticios incluidos en el Mock

He creado datos realistas para que la web se vea completa aunque se ejecute sin conexión. Todos los datos están en español y tienen coherencia temática con ASIR:

#### Tabla `Proyectos` — 3 proyectos
| id | nombre | descripción |
|----|--------|-------------|
| 1 | Sistema de Gestión de Incidencias ASIR | Plataforma web con React y Node.js |
| 2 | Monitor de Redes con SNMP | Monitoreo de infraestructura de red |
| 3 | Dashboard de Ciberseguridad | Panel de análisis de seguridad |

#### Tabla `Cursos` — 3 cursos
| id | nombre | institución |
|----|--------|-------------|
| 1 | Administración de Sistemas Linux | Cisco Networking Academy |
| 2 | Seguridad en Redes Empresariales | Google Skill Boost |
| 3 | Fundamentos de Ciberseguridad | Universidad Politécnica de Madrid |

#### Tabla `Servicios` — 3 servicios
| id | nombre |
|----|--------|
| 1 | Consultoría en Ciberseguridad |
| 2 | Despliegue de Infraestructura Cloud |
| 3 | Soporte Técnico Especializado ASIR |

#### Tabla `Informacion_Contacto` — 1 registro
| email | dirección |
|-------|-----------|
| aaron.cruz@example.com | C/ Tecnología, 42 · 28001 Madrid, España |

#### Tabla `Mensaje_Contacto` — Operación Insert simulada
Cuando alguien envía el formulario de contacto, el mock responde como si el mensaje se hubiera guardado correctamente, sin almacenar nada realmente.

### Cómo funciona el Mock por dentro

El mock implementa una **API fluida (fluent API)** que imita el comportamiento de Supabase. Esto significa que soporta el encadenamiento de métodos como `.from().select().eq().single()`:

```tsx
// El Mock interpreta cadenas como esta:
supabase.from('Servicios').select('*').eq('id', 1).single()

// Y las convierte internamente a:
// 1. Busca la tabla "Servicios" en los datos locales
// 2. Filtra las filas donde id == 1
// 3. Devuelve un solo objeto en lugar de un array
```

**Métodos soportados por el Mock:**
- `.select('*')` — Selecciona todos los campos
- `.eq('columna', valor)` — Filtra donde columna sea igual a valor
- `.order('columna', { ascending: true/false })` — Ordena los resultados
- `.single()` — Espera un único resultado
- `.insert([...])` — Simula una inserción

**Analogía:** Es como tener un **diccionario** con todos los datos dentro del propio programa. Cuando haces una pregunta ("dame todos los servicios"), el mock consulta el diccionario en lugar de preguntar a la base de datos real.

### ¿Qué ventajas tiene este sistema?

1. **La web funciona sin internet** o sin tener configurada Supabase.
2. **Se puede mostrar el portfolio en clase** sin necesidad de credenciales ni conexión.
3. **Es transparente**: los componentes que usan Supabase no saben si están usando el cliente real o el mock, porque ambos tienen la misma interfaz.
4. **Fácil de depurar**: los datos son predecibles y no cambian.

---

## 7. Cada llamada a Supabase explicada

### 7.1. Proyectos — Leer todos (`src/services/proyectoService.ts`)

```tsx
await supabase.from('Proyectos').select('*')
```

- **Operación:** SELECT (lectura)
- **Tabla:** `Proyectos`
- **Qué hace:** Pide "dame todos los proyectos de la base de datos". Devuelve un array de objetos con los campos: `id`, `nombre`, `descripcion`, `imagen_url`, `link`.
- **Si falla:** Imprime el error en consola y devuelve `{ data: null, error }`.

### 7.2. Cursos — Leer todos ordenados (`src/services/cursoService.ts`)

```tsx
await supabase.from('Cursos').select('*').order('id', { ascending: false })
```

- **Operación:** SELECT con ordenación
- **Tabla:** `Cursos`
- **Qué hace:** Pide todos los cursos ordenados por ID de forma descendente (del más reciente al más antiguo).
- **Devuelve:** Array de objetos con: `id`, `nombre`, `institucion`, `descripcion`, `fecha`, `certificado_url`, `imagen_logo`.

### 7.3. Servicios — Leer todos (`src/pages/Servicios.tsx`)

```tsx
await supabase.from('Servicios').select('*')
```

- **Operación:** SELECT
- **Tabla:** `Servicios`
- **Devuelve:** Array de objetos con: `id`, `nombre`, `descripcion`, `detalles`, `imagen_url`.

### 7.4. Servicios — Leer uno por ID (`src/pages/ServicioDetalle.tsx`)

```tsx
await supabase.from('Servicios').select('*').eq('id', id).single()
```

- **Operación:** SELECT con filtro
- **Filtro:** `.eq('id', id)` — solo devuelve el servicio cuyo `id` coincida con el de la URL.
- **`.single()`** — Indica que esperamos un solo objeto, no un array.
- **Analogía:** "Es como buscar en una lista de servicios y decir: 'solo quiero el que tiene el número 2'."

### 7.5. Información de Contacto — Leer (`src/pages/Contacto.tsx`)

```tsx
await supabase.from('Informacion_Contacto').select('*').single()
```

- **Operación:** SELECT con `.single()`
- **Tabla:** `Informacion_Contacto`
- **Devuelve:** Un solo objeto con: `email_personal`, `direccion_texto`, `google_maps_url`.
- **Analogía:** "Como una tabla de una sola fila que guarda la configuración de contacto."

### 7.6. Mensaje de Contacto — Insertar (`src/pages/Contacto.tsx`)

```tsx
await supabase.from('Mensaje_Contacto').insert([{ nombre, email, mensaje: mensajeFinal }])
```

- **Operación:** INSERT (escritura)
- **Tabla:** `Mensaje_Contacto`
- **Qué hace:** Toma los datos del formulario (nombre, email, mensaje) y los guarda como una nueva fila en Supabase.
- **Nota:** En el mock, esta operación siempre "funciona" y devuelve éxito, pero no guarda nada realmente.

---

## 8. TypeScript: los tipos e interfaces

### ¿Qué es TypeScript y por qué ayuda?

**Analogía:** Imagina que guardas cosas en cajas. Sin TypeScript, las cajas no tienen etiqueta — puedes meter un zapato donde debería ir un plato y no te enteras hasta que abres la caja. Con TypeScript, **etiquetas cada caja** antes de guardar: "esta caja solo acepta números", "esta solo acepta objetos con título y precio". Si intentas meter algo que no corresponde, TypeScript te avisa **antes** de que el programa se ejecute.

### Interfaces del proyecto

La interfaz más importante es la del `MockQueryBuilder`, que es el corazón del sistema mock. Define cómo se comporta el simulador de base de datos:

```tsx
class MockQueryBuilder {
  private tableName: string;
  private isSingle: boolean = false;
  private filterColumn: string | null = null;
  private filterValue: unknown = null;
  // ... más propiedades de estado

  select(_columns = '*'): this { ... }
  order(column: string, options?: { ascending?: boolean }): this { ... }
  eq(column: string, value: unknown): this { ... }
  single(): this { ... }
  insert(rows: any[]): this { ... }
  then(onfulfilled?, onrejected?): Promise<any> { ... }
}
```

Además, cada tabla tiene su propia interfaz implícita definida por los datos que contiene:

| Tabla | Campos |
|-------|--------|
| `Proyectos` | `id: number, nombre: string, descripcion: string, imagen_url: string, link: string` |
| `Cursos` | `id: number, nombre: string, institucion: string, descripcion: string, fecha: string, certificado_url: string, imagen_logo: string` |
| `Servicios` | `id: number, nombre: string, descripcion: string, detalles: string, imagen_url: string` |
| `Informacion_Contacto` | `email_personal: string, direccion_texto: string, google_maps_url: string` |
| `Mensaje_Contacto` | `nombre: string, email: string, mensaje: string` |

---

## 9. El diseño visual: Tailwind CSS

### ¿Qué es Tailwind CSS?

**Analogía:** Normalmente, para dar estilo a una web, escribes CSS a medida para cada elemento. Tailwind es como tener **un enorme juego de piezas de LEGO pre-hechas**: en lugar de construir cada adorno desde cero, simplemente eliges piezas que ya existen. Por ejemplo, en lugar de escribir `font-size: 14px; color: blue; margin-top: 10px;`, escribes `text-sm text-blue-500 mt-2.5`.

Todo el diseño del portfolio usa **clases de Tailwind directamente en el HTML**.

### El tema oscuro

El proyecto usa un **tema oscuro** con esta paleta:
- **Fondo principal:** `#0a0a0a` (negro carbón)
- **Color de acento:** `#e63946` (rojo vivo)
- **Texto principal:** `#ffffff` (blanco)
- **Texto secundario:** `#71717a` (gris zinc)

### Efectos visuales destacados

- **Glassmorphism:** Efecto de cristal esmerilado con `backdrop-blur-xl`, `bg-zinc-900/30` y bordes semitransparentes. Se usa en las tarjetas de Cursos, Sobre Mí y Home.
- **Animaciones de hover:** Las tarjetas se elevan (`hover:-translate-y-1`), cambian de borde a rojo y tienen sombras brillantes (`hover:shadow-[0_0_30px_rgba(230,57,70,0.15)]`).
- **Marquee infinito:** Barra de tecnologías que se desplaza horizontalmente sin fin usando `@keyframes marquee`.
- **Tipografía:** Usa **Inter** para textos generales y **JetBrains Mono** para textos técnicos/monospace, cargadas desde Google Fonts.
- **Spinner de carga:** Animación de círculo giratorio mientras se cargan datos de Supabase.

### Archivo de estilos base (`src/index.css`)

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

@layer base {
  :root {
    background-color: #050505;
    color: white;
  }
}
```

Define las fuentes personalizadas y el fondo/color base.

---

## 10. Los `.map()` explicados

El método `.map()` recorre una lista (array) y ejecuta una función por cada elemento, devolviendo un nuevo array con los resultados.

### 10.1. Proyectos.tsx (línea 35)

```tsx
{proyectos.map((p) => (
  <div key={p.id}>
    <img src={p.imagen_url} alt={p.nombre} />
    <h3>{p.nombre}</h3>
    <p>{p.descripcion}</p>
    <a href={p.link}>Ver proyecto</a>
  </div>
))}
```

- **Array recorrido:** `proyectos`, que viene de Supabase (o del mock).
- **Qué devuelve:** Una tarjeta con imagen, nombre, descripción y enlace.
- **Analogía:** "Tengo una lista de proyectos guardados en la nube, y por cada uno pinto una tarjeta."

### 10.2. Cursos.tsx (línea 39)

```tsx
{cursos.map((curso, index) => (
  <motion.div key={curso.id}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    {/* contenido de la tarjeta */}
  </motion.div>
))}
```

- **Array recorrido:** `cursos`, de Supabase/mock.
- **Particularidad:** Usa `index * 0.1` como retardo para que las tarjetas aparezcan una tras otra (efecto escalonado).
- **Analogía:** "Cada curso aparece con una pequeña animación, como si las tarjetas entraran en fila."

### 10.3. Servicios.tsx (línea 41)

```tsx
{servicios.map((s) => (
  <div key={s.id}>
    <img src={s.imagen_url} alt={s.nombre} />
    <h3>{s.nombre}</h3>
    <p>{s.descripcion}</p>
    <Link to={`/servicios/${s.id}`}>Ver más detalles</Link>
  </div>
))}
```

- **Array recorrido:** `servicios`, de Supabase/mock.
- **Particularidad:** El enlace usa una **ruta dinámica**: `` `/servicios/${s.id}` ``. Cada servicio enlaza a su propia página de detalle.

### 10.4. SobreMi.tsx (línea 63 y 70)

Dos `.map()`:
1. **Stack tecnológico** (6 elementos): Recorre un array de tecnologías y pinta tarjetas con icono, nombre y descripción.
2. **Métricas** (4 elementos): Recorre un array de stats y pinta el valor grande con la etiqueta debajo.

### 10.5. Navbar.tsx (línea 52)

```tsx
{links.map((link) => (
  <Link key={link.path} to={link.path}
    className={location.pathname === link.path ? 'text-[#e63946]' : 'text-zinc-400'}>
    {link.name}
  </Link>
))}
```

- **Array recorrido:** 6 objetos con `name` (Inicio, Sobre mi, Cursos...) y `path` (/, /sobre-mi, /cursos...).
- **Qué hace:** Pinta un enlace de navegación por cada ruta. Si es la página actual, lo resalta en rojo.

---

## 11. El sistema de estado con useState y useEffect

### ¿Qué es el "estado" en React?

**Analogía:** El estado es como la **memoria a corto plazo** de un componente. Cuando cambias algo en la pantalla (escribes en un input, cargas datos, abres una descripción...), esos cambios se guardan en el "estado". React vigila el estado, y cuando cambia, React vuelve a pintar automáticamente el componente para reflejar los cambios.

### Todos los `useState` del proyecto

| Archivo | Estado | ¿Qué guarda? |
|---------|--------|-------------|
| `Servicios.tsx` | `servicios: Servicio[]` | Lista de servicios de Supabase |
| `Servicios.tsx` | `loading: boolean` | Si está cargando los datos |
| `ServicioDetalle.tsx` | `servicio: Servicio \| null` | El servicio actual o null mientras carga |
| `Proyectos.tsx` | `proyectos: Proyecto[]` | Lista de proyectos de Supabase |
| `Proyectos.tsx` | `cargando: boolean` | Si está cargando los datos |
| `Cursos.tsx` | `cursos: Curso[]` | Lista de cursos de Supabase |
| `Contacto.tsx` | `info: InfoContacto \| null` | Información de contacto de Supabase |
| `Contacto.tsx` | `status: string` | Mensaje de estado del formulario (enviando, éxito, error) |
| `Contacto.tsx` | `cargando: boolean` | Si está cargando la info de contacto |
| `Contacto.tsx` | `asunto: string` | Valor seleccionado en el desplegable de asunto |
| `Navbar.tsx` | `isOpen: boolean` | Si el menú móvil está abierto o cerrado |

### Todos los `useEffect` del proyecto

| Archivo | Dependencias | ¿Qué hace? |
|---------|-------------|------------|
| `Servicios.tsx` | `[]` | Obtiene servicios de Supabase al montar |
| `ServicioDetalle.tsx` | `[id]` | Obtiene un servicio por ID (se re-ejecuta si cambia el ID) |
| `Proyectos.tsx` | `[]` | Obtiene proyectos de Supabase al montar |
| `Cursos.tsx` | `[]` | Obtiene cursos de Supabase al montar |
| `Contacto.tsx` | `[]` | Obtiene info de contacto de Supabase al montar |

### El patrón típico: "Cargo datos al montar el componente"

Este es el patrón más importante del proyecto y se repite en Servicios, Proyectos, Cursos y Contacto:

```
1. useState([])          → Creo un "cajón vacío" para guardar los datos
2. useState(true)        → Creo un indicador de "cargando"
3. async function fn()   → Defino una función que va a buscar datos
4.   const { data } = await supabase.from('X').select('*')  → Llamo a Supabase
5.   if (data) setX(data)   → Meto los datos en el cajón
6.   setCargando(false)     → Ya terminó la carga
7. useEffect(() => { fn() }, []) → Cuando el componente se muestra, ejecuto la función
8. {cargando ? <Spinner/> : datos.map(...)} → Mientras carga, muestro un spinner; cuando termina, los datos
```

**Por qué funciona:** React llama a `useEffect` automáticamente cuando el componente aparece en pantalla. Eso dispara la función que obtiene los datos. Cuando los datos llegan, `setX` actualiza el estado, y React vuelve a pintar el componente con los datos ya cargados.

**Ejemplo concreto (Servicios):**

```tsx
const [servicios, setServicios] = useState<Servicio[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchServicios = async () => {
    const { data } = await supabase.from('Servicios').select('*');
    if (data) setServicios(data);
    setLoading(false);
  };
  fetchServicios();
}, []);
```

---

## 12. Preguntas que me pueden hacer y sus respuestas

### P1: ¿Por qué usaste React y no otra tecnología como HTML+CSS plano?

**Respuesta:** Porque React me permite dividir la web en **componentes reutilizables** (como piezas de LEGO). En lugar de repetir el mismo código en cada página, creo un componente `Navbar` una vez y lo uso en todas las páginas. Además, React actualiza automáticamente la pantalla cuando los datos cambian, sin tener que recargar la página. También es la tecnología más demandada actualmente para desarrollo frontend.

### P2: ¿Qué es un componente?

**Respuesta:** Un componente es una **pieza independiente de la interfaz**, como un sello. El Navbar es un componente, el Footer es otro, cada tarjeta de curso es otro. Cada componente tiene su propio código, su propio estilo y, si lo necesita, su propio "estado" (memoria interna). Los componentes se pueden reutilizar y combinar como piezas de LEGO.

### P3: ¿Cómo funciona el `.map()` del proyecto?

**Respuesta:** El `.map()` es como una **cadena de montaje**: cojo un array (una lista) de elementos (por ejemplo, 3 proyectos), y por cada uno ejecuto una función que devuelve un trozo de HTML. El resultado es un array de trozos HTML que React pinta en pantalla. Es como tener una lista de la compra y, por cada artículo, escribir una tarjeta.

### P4: ¿Qué pasa si Supabase falla?

**Respuesta:** El proyecto tiene un **sistema Mock** que lo soluciona. Si no hay variables de entorno configuradas (VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY), el sistema automáticamente usa datos ficticios realistas. Esto significa que la web funciona aunque no haya conexión a internet o la base de datos no esté disponible. Es como tener un "simulacro" de la base de datos dentro del propio código.

### P5: ¿Qué es TypeScript y para qué lo usaste?

**Respuesta:** TypeScript es un "superconjunto" de JavaScript que añade **tipos**. Es como etiquetar cada variable: "esto es un número", "esto es un objeto con título y precio". TypeScript revisa el código antes de ejecutarlo y detecta errores como "estás intentando usar un número como si fuera un texto". Lo usé para que el código sea más robusto y fácil de mantener.

### P6: ¿Qué es Vite?

**Respuesta:** Vite es una herramienta que **acelera el desarrollo**. En lugar de empaquetar todo el código cada vez que hago un cambio, Vite solo actualiza la parte que cambié, lo que hace que los cambios se vean al instante. También optimiza el código cuando lo paso a producción para que pese menos y cargue más rápido.

### P7: ¿Cómo funciona el enrutamiento?

**Respuesta:** El enrutamiento decide **qué página mostrar según la URL**. Funciona como el índice de un libro: si la URL es `/cursos`, el router busca la ruta que coincide y renderiza el componente `Cursos`. Todo esto ocurre sin recargar la página del navegador, lo que hace la navegación más rápida y suave. En este proyecto, las rutas están definidas directamente en `App.tsx`.

### P8: ¿Qué es un hook?

**Respuesta:** Un hook es una **función especial de React** que permite usar características como el estado o los efectos secundarios dentro de un componente. El hook más usado en este proyecto es `useState`, que crea una "variable con memoria" que React vigila para actualizar la pantalla cuando cambia. Otro es `useEffect`, que ejecuta código cuando el componente aparece o se actualiza.

### P9: ¿Qué es el sistema Mock?

**Respuesta:** El sistema Mock es un **simulador de base de datos**. Cuando no hay conexión a Supabase, en lugar de que la web se rompa, un "cliente falso" llamado `MockQueryBuilder` responde a las mismas preguntas que harías a la base de datos real pero con datos ficticios guardados en el propio código. Es como tener un **libro de respuestas** dentro del programa: cuando preguntas "dame los proyectos", el mock consulta su lista interna y te responde con 3 proyectos de ejemplo. Esto permite que la web se pueda mostrar y probar en cualquier momento, incluso sin conexión a internet.

### P10: ¿Qué es el estado en React?

**Respuesta:** El estado es la **memoria interna** de un componente. Por ejemplo, el estado `loading` en Servicios recuerda si los datos se están cargando. Cuando el estado cambia (los datos llegan), React vuelve a pintar automáticamente la parte de la pantalla que depende de ese estado. Es como un interruptor: cuando cambia, la luz (la pantalla) cambia.

### P11: ¿Qué librerías externas usaste y por qué?

**Respuesta:** Las principales son:
- **React Router** — para tener múltiples páginas sin recargar.
- **Supabase JS** — para conectarme a la base de datos en la nube (o al mock).
- **Tailwind CSS** — para dar estilo de forma rápida con clases prehechas.
- **Framer Motion** — para animaciones suaves (aparición de tarjetas, transiciones).
- **Typewriter Effect** — para la animación de escritura automática en el héroe.
- **React Icons** — para iconos (FontAwesome: FaServer, FaLinux, etc.).

### P12: ¿Cómo se actualiza la pantalla después de obtener datos?

**Respuesta:** Sigue este flujo: 1) Al cargar la página, `useEffect` ejecuta una función. 2) Esa función llama a Supabase (o al mock). 3) Los datos recibidos se guardan en el estado con `setDatos(...)`. 4) React detecta que el estado cambió y vuelve a pintar el componente. 5) Ahora el `.map()` recorre los datos y pinta las tarjetas en pantalla.

### P13: ¿Qué fallos o mejoras le ves al proyecto?

**Respuesta sincera:** Varias:
1. **No hay página 404** — si navegas a una URL que no existe, no se muestra nada.
2. **No hay indicador de carga en todas las páginas** — en Proyectos y Cursos, si hay error no se ve un mensaje claro.
3. **El formulario de contacto requiere Telegram** — si no hay token de Telegram, la notificación no llega (aunque el mensaje se guarda en Supabase).
4. **Los datos mock están en el código fuente** — si se quisieran cambiar, habría que modificar el archivo `supabaseClient.ts`.
5. **No hay panel de administración** — no se puede añadir contenido desde la web.

### P14: ¿Cómo creaste el proyecto desde cero?

**Respuesta:** Usé el comando `npm create vite@latest portfolio -- --template react-ts` que crea un proyecto base con React + TypeScript ya configurados. Luego instalé las dependencias una a una: Tailwind CSS, React Router, Supabase, Framer Motion, etc. El diseño visual lo fui construyendo componente por componente, usando Tailwind para los estilos y Framer Motion para las animaciones.

### P15: ¿Qué es el `useEffect` y por qué tiene `[]`?

**Respuesta:** `useEffect` ejecuta código cuando el componente se **monta** (aparece) o cuando ciertos valores cambian. El `[]` vacío significa "ejecuta esto solo una vez, justo cuando el componente aparece por primera vez". Sin el `[]`, se ejecutaría cada vez que el componente se actualiza, lo que provocaría un bucle infinito de llamadas a Supabase.

### P16: ¿Qué es una API fluida (fluent API)?

**Respuesta:** Es un estilo de programación donde puedes **encadenar métodos** uno detrás de otro. El mock de Supabase lo usa: puedes escribir `supabase.from('Servicios').select('*').eq('id', 1).single()`. Cada método devuelve el mismo objeto, permitiendo seguir añadiendo métodos. Es como una **frase** que se va construyendo: "de la tabla Servicios → selecciona todo → donde el id sea 1 → y devuelve solo uno".

---

## Resumen del flujo completo de la aplicación

```
index.html
    └── <div id="root">
         └── main.tsx
              └── App.tsx
                   ├── Navbar (barra de navegación)
                   ├── <Routes>
                   │    ├── Home (/)
                   │    ├── SobreMi (/sobre-mi)
                   │    ├── Servicios (/servicios) ──► Supabase / Mock (SELECT)
                   │    ├── ServicioDetalle (/servicios/:id) ──► Supabase / Mock (SELECT con filtro)
                   │    ├── Proyectos (/proyectos) ──► Supabase / Mock (SELECT)
                   │    ├── Cursos (/cursos) ──► Supabase / Mock (SELECT ordenado)
                   │    └── Contacto (/contacto)
                   │         ├── Informacion_Contacto ──► Supabase / Mock (SELECT single)
                   │         └── Mensaje_Contacto ──► Supabase / Mock (INSERT)
                   └── Footer (pie de página)

Cliente Supabase (src/supabase/supabaseClient.ts)
    ├── ¿Hay VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY?
    │    ├── SÍ  → Usa createClient() real (conexión a la nube)
    │    └── NO  → Usa MockQueryBuilder con datos ficticios
    └── Tablas disponibles en el Mock:
         ├── Proyectos (3 proyectos)
         ├── Cursos (3 cursos)
         ├── Servicios (3 servicios)
         ├── Informacion_Contacto (1 registro)
         └── Mensaje_Contacto (INSERT simulado)
```

---

## Glosario para la presentación

| Término | Qué decir en la presentación |
|---------|------------------------------|
| **React** | Librería de JavaScript para construir interfaces con piezas reutilizables llamadas componentes |
| **Componente** | Una pieza independiente de la interfaz (como un sello o un ladrillo LEGO) |
| **Estado (state)** | La memoria interna de un componente; cuando cambia, la pantalla se actualiza sola |
| **Hook** | Función especial de React para usar estado y otras características |
| **useState** | Hook que crea una variable con memoria |
| **useEffect** | Hook que ejecuta código cuando el componente aparece o cambia |
| **Router** | Sistema que decide qué página mostrar según la URL |
| **Props** | Parámetros que se le pasan a un componente (como argumentos de una función) |
| **.map()** | Método que recorre una lista y devuelve un elemento por cada ítem |
| **Supabase** | Base de datos en la nube con API automática |
| **Mock** | Simulacro de base de datos que devuelve datos ficticios para que la web funcione sin conexión |
| **API Fluida** | Estilo de programación que permite encadenar métodos (`.from().select().eq().single()`) |
| **Tailwind CSS** | Sistema de estilos con clases prehechas (como piezas de LEGO) |
| **Framer Motion** | Librería de animaciones para React |
| **TypeScript** | JavaScript con tipos — etiqueta las variables para evitar errores |
| **Vite** | Herramienta que acelera el desarrollo y optimiza el código final |
| **Typewriter Effect** | Efecto de máquina de escribir que anima el texto letra por letra |
