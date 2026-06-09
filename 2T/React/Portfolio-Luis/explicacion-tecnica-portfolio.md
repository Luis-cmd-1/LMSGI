# Explicación Técnica del Portfolio de Luis Miguel

> Documento pensado para que puedas explicar tu proyecto ante un tribunal, aunque no sepa nada de programación.

---

## 1. ¿Qué es este proyecto?

Es una **página web personal (portfolio)** que he creado para mostrar mis estudios, servicios, cursos y trabajos como estudiante de ASIR (Administración de Sistemas Informáticos en Red).

La web funciona como un **catálogo online** donde cualquiera puede ver mi formación y lo que sé hacer, y además incluye un **panel de administración oculto** donde yo puedo añadir, modificar o eliminar contenido sin tocar una línea de código — todo desde formularios en la propia web.

Está construida con **React** (una librería moderna de JavaScript para hacer interfaces de usuario), **TypeScript** (un "superconjunto" de JavaScript que evita errores), **Vite** (una herramienta que hace que el desarrollo sea muy rápido) y se conecta a **Supabase** (una base de datos en la nube).

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
    <title>portfolio-luis</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Explicación:** Es un HTML mínimo. Lo importante está en la línea 10: hay un `<div id="root">` vacío, y en la línea 11 se carga un archivo JavaScript (`main.tsx`). Ese archivo es el que va a construir toda la página desde cero.

#### 2. `main.tsx` — El punto de entrada

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'

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

#### 3. `App.tsx` — El componente principal

```tsx
// src/App.tsx
import { AppRouter } from "./router/AppRouter"

export const App = () => {
   return(
      <AppRouter/>
   )
}
```

**Explicación:** `App` es el componente raíz. Lo único que hace es cargar `AppRouter`, que es el sistema de rutas. Piensa en `AppRouter` como el "director de tráfico" que decide qué página mostrar según la URL.

#### 4. El router decide qué página pintar

`AppRouter` usa `react-router-dom`, una librería que permite que la web tenga múltiples "páginas" (vistas) sin recargar el navegador. Cuando cambias de URL, el router detecta el cambio y renderiza el componente correspondiente.

---

## 3. El sistema de rutas (React Router)

### ¿Qué es un router y para qué sirve?

Imagina que tu web es un **edificio de varias habitaciones**. El router es el **índice de puertas** que hay en la entrada: te dice qué hay detrás de cada puerta y te lleva allí sin tener que salir del edificio. En una web sin router, cada vez que cambias de página el navegador recarga todo. Con React Router, solo se cambia la parte que toca — es más rápido y suave.

### Archivo: `src/router/AppRouter.tsx`

```tsx
export const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />} >
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Formacion" element={<Formacion/>}/>
                    <Route path="/servicios" element={<Servicios/>}/>
                    <Route path="/cursos" element={<Cursos/>}/>
                    <Route path="/contacto" element={<Contacto/>}/>
                    <Route path="/Trabajos" element={<Trabajos/>}/>
                    <Route path="*" element={<NotFound />} />                
                </Route>

                <Route path="/admin" element={<BackendLayout/>}>
                    <Route path="/admin/Cursos" element={<AdminCursos/>}/>
                    <Route path="/admin/Formacion" element={<AdminFormacion/>}/>
                    <Route path="/admin/Servicios" element={<AdminServicios/>}/>
                    <Route path="/admin/Trabajos" element={<AdminTrabajos/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
```

**Explicación línea por línea:**

- `<BrowserRouter>` — Es el "contenedor" del router. Le dice a la app: "a partir de aquí, funciona con rutas de navegador".
- `<Routes>` — Es el "director de tráfico". Mira la URL actual y busca una ruta que coincida.
- **Rutas públicas (envueltas en `MainLayout`)**: Home (`/`), Formación (`/Formacion`), Servicios (`/servicios`), Cursos (`/cursos`), Contacto (`/contacto`), Trabajos (`/Trabajos`).
- `<Route path="*" element={<NotFound />} />` — El comodín `*` captura **cualquier URL que no coincida con las anteriores**. Es la página de error 404.
- **Rutas de admin (envueltas en `BackendLayout`)**: `/admin/Cursos`, `/admin/Formacion`, `/admin/Servicios`, `/admin/Trabajos` — todas empiezan con `/admin`, lo que las hace "inaccesibles" desde la navegación normal (no hay enlaces públicos a ellas, solo aparecen en el menú del panel de administración).

### ¿Qué es un Layout?

Un Layout es como una **plantilla** que envuelve a las páginas. `MainLayout` añade el `Header` (barra de navegación) y el `Footer` (pie de página) a todas las páginas públicas, y `BackendLayout` añade la barra lateral del panel de administración.

### El `Outlet` — ¿dónde se pinta la página?

```tsx
// src/layouts/MainLayout.tsx (fragmento)
<main className="flex-1 relative z-10">
    <Outlet />
</main>
```

`Outlet` es como un **hueco** en la plantilla. Cuando entras a `/servicios`, el router mete el componente `Servicios` dentro de ese hueco. El Header y el Footer se quedan fijos alrededor.

### ¿Qué pasa si la URL no existe?

El `path="*"` atrapa cualquier ruta no definida y muestra el componente `NotFound`:

```tsx
// src/pages/NotFound.tsx
<h1 className="mt-4 text-8xl font-semibold text-white tracking-tight">404</h1>
<p className="mt-4 font-mono text-sm text-[#5a8fa8] tracking-wide">Página no encontrada</p>
<Link to="/">← Volver al inicio</Link>
```

Muestra un "404" grande y un botón para volver a la página principal.

✅ **Bien implementado:** Uso correcto de Layouts con Outlet, ruta comodín para 404, separación clara entre rutas públicas y de admin.

---

## 4. Cada página explicada individualmente

### 4.1. Home (`src/pages/Home.tsx`) — Página principal

**¿Qué muestra?**
- El nombre "Luis Miguel" destacado en azul cyan.
- Un indicador de disponibilidad ("DISPONIBLE · ESPAÑA" con un punto verde parpadeante).
- Una descripción: "Estudiante de Administración de Sistemas Informáticos en Red".
- Dos botones: "Ver proyectos" y "Contactar".
- Una sección de **Stack técnico** con 10 tecnologías (Linux, Cisco, Docker, etc.) mostradas como tarjetas pequeñas.
- Una sección de **Stats** con 3 indicadores: "2° Año ASIR", "12+ Prácticas", "5+ Proyectos".

**¿Qué datos usa?**
- Los datos del stack técnico están escritos **directamente en el código** (no vienen de base de datos):

```tsx
{[
  { label: "Linux", highlight: false },
  { label: "Cisco", highlight: true },
  ...
].map(({ label, highlight }) => (
  // pinta una tarjeta por cada tecnología
))}
```

- Los stats también están escritos directamente en el código.
- Los botones no tienen funcionalidad real (no redirigen a nada).

✅ **Bien:** Diseño visual atractivo con efecto de rejilla y animaciones.
⚠️ **A mejorar:** Los botones "Ver proyectos" y "Contactar" no redirigen a las páginas reales; el logo del header usa una imagen de placeholder de Tailwind.

---

### 4.2. Formación (`src/pages/formacion/Formacion.tsx`)

**¿Qué muestra?**
- Cabecera, stats (2+ años, 1+ certificaciones, 5+ cursos) y una cuadrícula de **4 tarjetas de formación**.
- Cada tarjeta tiene: tipo (FP Superior / Certificación / Curso), título, subtítulo, centro, ubicación, período, estado (En curso / Completado), una descripción expandible, y etiquetas de habilidades.

**¿Qué datos usa y de dónde vienen?**
Los datos están definidos **directamente en el código** como un array de objetos. Por ejemplo:

```tsx
const formacion: FormacionItem[] = [
  {
    id: 1,
    tipo: "FP Superior",
    titulo: "Técnico Superior en ASIR",
    ...
    color: "cyan",
  },
  // ... 3 más
]
```

Cada tarjeta tiene un color distinto (cyan, azul, verde, naranja) que se asigna con un `colorMap`.

**Lógica especial:**
- El componente `FormacionCard` tiene un estado `expanded` (expandido/contraído). Al hacer clic en "[ + ver más ]" se despliega la descripción; al hacer clic en "[ — ocultar ]" se contrae. Esto se consigue cambiando la clase CSS `max-h-0` (altura máxima 0) a `max-h-40` (altura máxima 40).

✅ **Bien:** Diseño visual consistente, cada tarjeta tiene código de color propio, descripción expandible.
⚠️ **A mejorar:** Los datos están hardcodeados, no vienen de Supabase como en Cursos y Trabajos.

---

### 4.3. Servicios (`src/pages/servicios/Servicios.tsx`)

**¿Qué muestra?**
- Cabecera, stats (6 servicios, 4 disponibles, 2+ años exp.) y 6 tarjetas de servicios.
- Cada tarjeta tiene: código (SRV-01, SRV-02...), título, descripción, etiquetas de habilidades y un indicador de disponibilidad (Disponible / Próximamente).
- Los servicios no disponibles se ven atenuados (más opacos).

**¿Qué datos usa?**
Datos hardcodeados directamente en el archivo, igual que Formación.

✅ **Bien:** Distinción visual clara entre servicios disponibles y no disponibles.
⚠️ **A mejorar:** Datos hardcodeados, no vienen de Supabase.

---

### 4.4. Cursos (`src/pages/cursos/Curso.tsx`)

**¿Qué muestra?**
- Cabecera con título "Cursos" y descripción. Si hay cursos en la base de datos, los pinta con `CursosCard`. Si no hay, muestra "No hay cursos disponibles".

**¿Qué datos usa y de dónde vienen?**
Esta página **sí obtiene datos de Supabase**:

```tsx
const [cursos, setCursos] = useState([]);       // Estado para guardar los cursos
const obtenerCursos = async () => {
    const data = await getCursos()               // Llama a Supabase
    setCursos(data)                              // Guarda los datos en el estado
}

useEffect(() => {
    obtenerCursos();                             // Se ejecuta al montar la página
}, [])
```

El patrón típico es: 1) Al cargar la página (`useEffect`), 2) Llamar a Supabase (`getCursos`), 3) Guardar los datos en el estado (`setCursos`), 4) Pintar los datos.

---

### 4.5. Trabajos (`src/pages/trabajos/Trabajos.tsx`)

**¿Qué muestra?**
- Cabecera, y si hay trabajos en Supabase los pinta con `TrabajosCard`. Si no, muestra "Proximamente...".

**¿Qué datos usa?**
Mismo patrón que Cursos: llama a `getTrabajos()` de Supabase, guarda en estado, renderiza.

---

### 4.6. Contacto (`src/pages/Contacto.tsx`)

**¿Qué muestra?**
- Un formulario de contacto con campos: Nombre, Apellido, Email, Mensaje.
- Tiene un botón "Enviar mensaje →".

**¿Qué datos usa?**
Usa estado local para manejar el formulario:

```tsx
const [form, setForm] = useState({ nombre: '', apellido: '', email: '', mensaje: '' })
const [agreed, setAgreed] = useState(false)
```

Cada vez que el usuario escribe en un campo, se llama a `handleChange` que actualiza el estado:

```tsx
const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value })
}
```

**⚠️ IMPORTANTE:** El botón de enviar **no envía realmente nada**. El código tiene un `TODO`:

```tsx
const handleSubmit = () => {
  // TODO: integrar Formspree / EmailJS aquí
  console.log('Enviando...', form)
}
```

Además, el botón de enviar se deshabilita si no se ha marcado el checkbox de privacidad, pero **el checkbox está comentado** (no visible), por lo que el botón siempre está deshabilitado y no se puede enviar.

⚠️ **A mejorar:** El formulario de contacto no es funcional — no envía correos, y el botón siempre está deshabilitado porque el checkbox de privacidad está comentado.

---

### 4.7. NotFound (`src/pages/NotFound.tsx`)

Página de error 404 para URLs no existentes. Muestra "404" grande, "Página no encontrada" y un enlace "← Volver al inicio".

---

## 5. Los componentes reutilizables

### 5.1. Header (`src/components/main/Header.tsx`)

**¿Para qué sirve?** Barra de navegación superior. Aparece en todas las páginas públicas.

**¿Qué hace?**
- Muestra 6 enlaces de navegación: Home, Formación, Servicios, Trabajos, Cursos y Contacto.
- Resalta con color azul el enlace de la página actual (gracias a `useLocation()` que detecta la URL).
- En móvil, los enlaces se ocultan y aparece un botón de "hamburguesa" (tres rayas) que despliega un menú vertical.
- Tiene un avatar a la derecha que, al hacer clic, muestra un menú desplegable con un enlace a "Ajustes" (que lleva a `/admin`, el panel de administración).

**Analogía:** Es como el **menú de navegación de cualquier web** — está siempre visible y te lleva a las secciones principales.

### 5.2. Footer (`src/components/main/Footer.tsx`)

**¿Para qué sirve?** Pie de página que muestra el año actual y "Mi Portfolio".

```tsx
<p>© {new Date().getFullYear()} — <span>Mi Portfolio </span></p>
```

Usa `new Date().getFullYear()` para mostrar el año automáticamente.

### 5.3. CursosCard + CursoCard (`src/components/cursos/`)

**CursosCard** recibe un array de cursos (prop `cursos`) y los recorre con `.map()` pintando un `CursoCard` por cada uno.

**CursoCard** recibe un solo curso (prop `curso`) y pinta:
- Una tarjeta con categoría, título, academia, precio y un botón "[ + VER MÁS ]" (que no hace nada, es decorativo).

```tsx
interface Props {
    curso: ICurso;
}
// ICurso tiene: curso_id, titulo, categoria, academia, precio
```

### 5.4. TrabajosCard + TrabajoCard (`src/components/trabajos/`)

**TrabajoCard** recibe un trabajo y pinta:
- Imagen (si tiene), empresa, título, fecha, descripción expandible, tecnologías como etiquetas, y un enlace "→ VISITAR" (si tiene enlace).

```tsx
interface Props {
    trabajo: ITrabajos;
}
```

Tiene un estado `expanded` para la descripción expandible, igual que FormacionCard.

### 5.5. FormacionCard (`src/components/formacion/FormacionCard.tsx`)

Misma estructura que TrabajoCard pero para datos de formación: categoría, título, autor, fecha, descripción expandible.

### 5.6. ServicioCard (`src/components/servicios/ServicioCard.tsx`)

Muestra tipo, nombre, descripción expandible, características y precio.

### 5.7. Componentes "Wrapper" (`CursosCard`, `TrabajosCard`, `FormacionesCard`, `ServiciosCard`)

Estos componentes son "contenedores" que reciben un array de datos y los distribuyen en una cuadrícula de 2 columnas. Su única responsabilidad es recibir `props` y pasarlas a los componentes individuales.

### 5.8. Componentes UI de shadcn (`src/components/ui/`)

Hay 23 componentes UI (Button, Card, Input, Select, Sidebar, Table, Tabs, etc.). Son componentes prediseñados de **shadcn/ui** que se han copiado al proyecto. No están instalados como librería externa, sino que sus archivos fuente están dentro del proyecto. Cada uno es personalizable y usa las variables CSS del tema.

---

## 6. Los `.map()` explicados uno a uno ⭐

Aquí están **todos** los `.map()` del proyecto, en orden de aparición:

### 6.1. Home.tsx — Stack técnico (línea 85)

```tsx
{[...].map(({ label, highlight }) => (
  <div key={label} className={...}>
    {label}
  </div>
))}
```

- **Array recorrido:** Un array de 10 objetos, cada uno con `label` (nombre de tecnología) y `highlight` (si debe destacarse).
- **Qué devuelve cada iteración:** Un `<div>` con el nombre de la tecnología. Cisco aparece destacado.
- **Analogía:** "Es como tener una lista de 10 tecnologías que sé usar, y por cada una pinto una tarjeta con su nombre. Si es Cisco, la tarjeta se ve más brillante."
- **Datos reales:** Linux, Cisco (destacado), Windows Server, Docker, Bash, Python, VMware, Active Directory, SQL, Tailwind.

### 6.2. Home.tsx — Stats (línea 113)

```tsx
{[...].map(({ num, label }) => (
  <div key={label} className={...}>
    <div>{num}</div>
    <div>{label}</div>
  </div>
))}
```

- **Array recorrido:** 3 objetos con `num` (número/valor) y `label` (descripción).
- **Qué devuelve:** Una tarjeta con el número grande y la etiqueta debajo.
- **Datos reales:** "2°" → "Año ASIR", "12+" → "Prácticas", "5+" → "Proyectos".

### 6.3. Formacion.tsx — Stats (línea 231)

Mismo patrón que Home, pero con datos de formación: "2+" → "Años formación", "1+" → "Certificaciones", "5+" → "Cursos".

### 6.4. Formacion.tsx — Tarjetas de formación (línea 252)

```tsx
{formacion.map((item) => (
  <FormacionCard key={item.id} item={item} />
))}
```

- **Array recorrido:** `formacion`, un array de 4 objetos con datos de formación.
- **Qué devuelve:** Un `FormacionCard` por cada elemento.
- **Analogía:** "Tengo 4 elementos en mi historial académico (ASIR, CCNA, Linux, Docker). Por cada uno, pinto una tarjeta con su información."

### 6.5. Formacion.tsx — Skills dentro de cada tarjeta (línea 163)

```tsx
{item.skills.map((s) => (
  <span key={s} className={...}>{s}</span>
))}
```

- **Array recorrido:** El array `skills` de cada formación (ej: `["Linux", "Windows Server", "Cisco", ...]`).
- **Qué devuelve:** Pequeñas etiquetas con cada habilidad.
- **Datos reales (primer item):** Linux, Windows Server, Cisco, Docker, VMware, Active Directory, SQL, Python, Bash.

### 6.6. Servicios.tsx — Stats (línea 118)

Mismo patrón: "6" → "Servicios", "4" → "Disponibles", "2+" → "Años exp."

### 6.7. Servicios.tsx — Tarjetas de servicios (línea 140)

```tsx
{servicios.map((srv) => (
  <div key={srv.id} className={...}>
    ...
  </div>
))}
```

- **Array recorrido:** `servicios`, 6 objetos de servicio.
- **Analogía:** "Tengo 6 servicios que ofrezco, y por cada uno dibujo una tarjeta. Si no está disponible, la tarjeta se ve más apagada."

### 6.8. Servicios.tsx — Skills dentro de cada tarjeta (línea 186)

```tsx
{srv.skills.map((s) => (
  <span key={s} className={...}>{s}</span>
))}
```

Mismo patrón que en Formación.

### 6.9. CursosCard.tsx — (línea 11)

```tsx
{cursos.map((curso) => (
  <CursoCard key={curso.curso_id} curso={curso} />
))}
```

- **Array recorrido:** `cursos`, que viene de Supabase (vienen de la base de datos).
- **Analogía:** "Tengo una lista de cursos guardados en la nube, y por cada curso pinto una tarjeta."

### 6.10. TrabajosCard.tsx — (línea 11)

```tsx
{trabajos.map((trabajo) => (
  <TrabajoCard key={trabajo.trabajo_id} trabajo={trabajo} />
))}
```

Mismo patrón que Cursos.

### 6.11. TrabajoCard.tsx — Tecnologías (línea 52)

```tsx
{trabajo.tecnologias && trabajo.tecnologias.map((tech) => (
  <span key={tech} className={...}>{tech}</span>
))}
```

- **Array recorrido:** `trabajo.tecnologias`, que es un array de strings (ej: `["React", "Node.js", "TypeScript"]`).
- **Nota:** `trabajo.tecnologias &&` es una comprobación de seguridad — solo hace el `.map()` si `tecnologias` existe y no es `null/undefined`.

### 6.12. FormacionesCard.tsx — (línea 11)

```tsx
{formaciones.map((formacion) => (
  <FormacionCard key={formacion.formacion_id} formacion={formacion} />
))}
```

### 6.13. ServiciosCard.tsx — (línea 11)

```tsx
{servicios.map((servicio) => (
  <ServicioCard key={servicio.servicio_id} servicio={servicio} />
))}
```

### 6.14. Header.tsx — Enlaces de navegación (línea 57 y 131)

```tsx
{opciones.map((item) => (
  <Link key={item.title} to={item.to} ...>{item.title}</Link>
))}
```

- **Array recorrido:** `opciones` = `[{title: 'Home', to: '/'}, {title: 'Formación', to: '/Formacion'}, ...]`
- **Qué devuelve:** Un enlace `<Link>` por cada opción del menú.
- **Aparece DOS VECES:** Una para el menú de escritorio (visible en pantallas grandes) y otra para el menú móvil (oculto en escritorio, visible en móvil).

### 6.15. DeleteCursoForm.tsx — Lista de cursos en el select (línea 68)

```tsx
{cursos.map(curso => (
  <option key={curso.curso_id} value={curso.curso_id}>
    {curso.titulo} — {curso.academia}
  </option>
))}
```

- **Array recorrido:** `cursos`, obtenidos de Supabase.
- **Qué devuelve:** Opciones de un `<select>` desplegable para que el admin elija qué curso eliminar.

### 6.16. UpdateCursoForm.tsx — Tabla de cursos (línea 193)

```tsx
{cursos.map((curso) => (
  <tr key={curso.curso_id} className={...}>
    <td>{curso.titulo}</td>  // más columnas...
    <td><Button onClick={() => seleccionarCurso(curso)}>Editar</Button></td>
  </tr>
))}
```

- **Array recorrido:** `cursos` de Supabase.
- **Qué devuelve:** Filas de una tabla HTML con los datos de cada curso y un botón "Editar".

### 6.17. NavMain.tsx — Items del menú lateral (línea 45)

```tsx
{items.map((item) => (
  <SidebarMenuItem key={item.title}>
    // ...
  </SidebarMenuItem>
))}
```

### 6.18. NavSecondary.tsx — Items secundarios (línea 27)

```tsx
{items.map((item) => (
  <SidebarMenuItem key={item.title}>
    // ...
  </SidebarMenuItem>
))}
```

### 6.19. NavDocuments.tsx — Items de documentos (línea 35)

```tsx
{items.map((item) => (
  <SidebarMenuItem key={item.name}>
    // ...
  </SidebarMenuItem>
))}
```

---

## 7. La conexión con Supabase (la "base de datos") ⭐ y el sistema Mock

### ¿Qué es Supabase?

Imagina que tienes una **hoja de cálculo de Excel guardada en la nube**, pero con superpoderes: en lugar de tener que abrir Excel y editarla manualmente, tu web puede **leer, escribir, modificar y borrar datos** mediante simples llamadas desde el código. Eso es Supabase.

Es una alternativa gratuita a Firebase que usa PostgreSQL como base de datos y ofrece una API REST automática para cada tabla.

### ¿Cómo se inicializa el cliente?

```tsx
// src/model/utils/supabase.ts
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

- `VITE_SUPABASE_URL` es la URL del proyecto en Supabase (ej: `https://onnvhasyttydbbxqtlwl.supabase.co`).
- `VITE_SUPABASE_PUBLISHABLE_KEY` es la clave pública (se puede compartir).
- `createClient` crea un objeto `supabase` que usaremos en todas las llamadas.

Ambos valores están en el archivo `.env` (que no se sube a GitHub porque está en `.gitignore`).

#### El sistema Mock (simulador de base de datos)

**¿Qué es un Mock?** Es un simulacro. En lugar de depender de una base de datos real en internet (que puede no estar disponible), he creado un sistema que **finge** tener los datos. Así la web funciona aunque no haya conexión a Supabase.

**¿Cómo funciona?** El `supabase.ts` comprueba si existen las variables de entorno:
- Si **existen**: usa el cliente real de Supabase
- Si **no existen**: usa un cliente simulado (mock) que devuelve datos ficticios

### Tablas en Supabase

El proyecto usa **4 tablas** en Supabase:

| Tabla | Qué guarda | API file |
|-------|-----------|---------|
| `cursos` | Cursos online | `apiCursos.ts` |
| `formaciones` | Formación académica | `apiFormacion.ts` |
| `servicios` | Servicios ofrecidos | `apiServicios.ts` |
| `trabajos` | Proyectos/trabajos | `apiTrabajos.ts` |

### Cada llamada a Supabase explicada

#### 7.1. Cursos — Leer todas (`apiCursos.ts`, línea 5)

```tsx
export const getCursos = async (): Promise<ICurso[]> => {
    const { data, error} = await supabase
                    .from('cursos')
                    .select();
    if (error) {
        console.log(error);
    }
    return data as ICurso[];
}
```

- **Operación:** SELECT (lectura)
- **Tabla:** `cursos`
- **Qué hace:** Pide "dame todos los cursos que hay en Supabase". Si hay error, lo imprime en consola. Devuelve los datos como un array de objetos `ICurso`.
- **Cómo llega a la pantalla:** La página `Cursos.tsx` llama a `getCursos()` dentro de un `useEffect`, guarda el resultado en el estado `cursos`, y luego `CursosCard` los renderiza.

#### 7.2. Cursos — Insertar (`apiCursos.ts`, línea 15)

```tsx
export const insertCurso = async (curso: ICurso) => {
    const { data, error} = await supabase
                    .from('cursos')
                    .insert(curso);
    if (error) {
        console.error(error)
        return[]
    }
    return "Curso insertado correctamente";
}
```

- **Operación:** INSERT (escritura)
- **Tabla:** `cursos`
- **Qué hace:** Recibe un objeto `curso` y lo añade como nueva fila en la tabla. Si falla, devuelve array vacío. Si funciona, devuelve un mensaje de éxito.
- **Cómo se usa:** El formulario `NewCursoForm` recoge los datos del usuario y llama a `insertCurso`.

#### 7.3. Cursos — Eliminar (`apiCursos.ts`, línea 28)

```tsx
export const deleteCurso = async (curso_id: string) => {
    const { error } = await supabase
                    .from('cursos')
                    .delete()
                    .eq('curso_id', curso_id);
    if (error) {
        console.error(error)
        throw error
    }
    return "Curso eliminado correctamente";
}
```

- **Operación:** DELETE (borrado)
- **Filtro:** `.eq('curso_id', curso_id)` — solo borra la fila cuyo `curso_id` coincida.
- **Analogía:** "Es como decirle a Supabase: borra la fila de la tabla 'cursos' donde el ID sea exactamente este."

#### 7.4. Cursos — Obtener por ID (`apiCursos.ts`, línea 41)

```tsx
export const getCursoById = async (curso_id: string): Promise<ICurso | null> => {
    const { data, error } = await supabase
                    .from('cursos')
                    .select()
                    .eq('curso_id', curso_id)
                    .single();
    // ...
}
```

- **Operación:** SELECT con filtro
- **`.single()`** — Indica que esperamos un solo resultado, no un array.

#### 7.5. Cursos — Actualizar (`apiCursos.ts`, línea 54)

```tsx
export const updateCurso = async (curso_id: string, cursoData: Partial<ICurso>) => {
    const { data, error } = await supabase
                    .from('cursos')
                    .update(cursoData)
                    .eq('curso_id', curso_id);
    // ...
}
```

- **Operación:** UPDATE (modificación)
- **`Partial<ICurso>`** — Significa que solo necesita enviar los campos que cambian, no el objeto completo.

#### 7.6. Formaciones — Leer todas (`apiFormacion.ts`)

```tsx
export const getFormaciones = async (): Promise<IFormacion[]> => {
    const { data, error} = await supabase.from('formaciones').select();
    return data as IFormacion[];
}
```

#### 7.7. Formaciones — Insertar (`apiFormacion.ts`, línea 15)

Mismo patrón que `insertCurso` pero con la tabla `formaciones`.

#### 7.8. Servicios — Leer todas (`apiServicios.ts`)

Mismo patrón, tabla `servicios`.

#### 7.9. Servicios — Insertar (`apiServicios.ts`, línea 15)

Mismo patrón.

#### 7.10. Trabajos — Leer todos (`apiTrabajos.ts`)

Mismo patrón, tabla `trabajos`.

#### 7.11. Trabajos — Insertar (`apiTrabajos.ts`, línea 15)

Mismo patrón.

### ¿Qué pasa si Supabase falla?

En todas las funciones:
- Si hay error, se imprime en la consola con `console.error(error)`.
- Las funciones de lectura devuelven los datos como si nada hubiera pasado (con `as ICurso[]`), lo que significa que si hay error, devuelven `undefined` y la página se muestra vacía o con el mensaje "No hay cursos disponibles".
- Las funciones de escritura devuelven un mensaje de error que los formularios muestran al usuario en un recuadro rojo.

⚠️ **A mejorar:** No hay manejo de errores visible para el usuario en las lecturas (solo en las escrituras). Si la base de datos falla, las páginas de cursos y trabajos se verían vacías sin que el usuario sepa por qué.

### Datos ficticios incluidos en el Mock

He creado datos realistas para que la web se vea completa aunque se ejecute sin conexión.

#### Tabla `cursos` — 3 cursos
| curso_id | título | academia |
|----------|--------|----------|
| 1 | Administración de Sistemas Linux | Cisco Networking Academy |
| 2 | Seguridad en Redes Empresariales | Google Skill Boost |
| 3 | Fundamentos de Ciberseguridad | Universidad Politécnica de Madrid |

#### Tabla `formaciones` — 2 formaciones

| formacion_id | título | centro |
|-------------|--------|--------|
| 1 | Técnico Superior en ASIR | IES Tecnológico |
| 2 | Especialización en Ciberseguridad | Centro de Formación Profesional |

#### Tabla `servicios` — 3 servicios

| servicio_id | nombre |
|------------|--------|
| 1 | Consultoría en Ciberseguridad |
| 2 | Mantenimiento de Infraestructura IT |
| 3 | Desarrollo Web |

#### Tabla `trabajos` — 3 trabajos

| trabajo_id | título |
|-----------|--------|
| 1 | Red Local Empresarial |
| 2 | Dashboard de Monitorización |
| 3 | Página Web Corporativa |

### Cómo funciona el Mock por dentro

El mock implementa una **API fluida (fluent API)** que imita el comportamiento de Supabase. Esto significa que soporta el encadenamiento de métodos como `.from().select().eq().single()`:

```tsx
// El Mock interpreta cadenas como esta:
supabase.from('cursos').select().eq('curso_id', '1').single()

// Y las convierte internamente a:
// 1. Busca la tabla "cursos" en los datos locales
// 2. Filtra las filas donde curso_id == '1'
// 3. Devuelve un solo objeto en lugar de un array
```

**Métodos soportados por el Mock:**
- `.select()` — Selecciona todos los campos
- `.eq('columna', valor)` — Filtra donde columna sea igual a valor
- `.single()` — Espera un único resultado
- `.insert([...])` — Simula una inserción
- `.delete().eq('columna', valor)` — Simula un borrado
- `.update({...}).eq('columna', valor)` — Simula una actualización

**Analogía:** Es como tener un **diccionario** con todos los datos dentro del propio programa. Cuando haces una pregunta ("dame todos los servicios"), el mock consulta el diccionario en lugar de preguntar a la base de datos real.

### ¿Qué ventajas tiene este sistema?

1. **La web funciona sin internet** o sin tener configurada Supabase.
2. **Se puede mostrar el portfolio en clase** sin necesidad de credenciales ni conexión.
3. **Es transparente**: los componentes que usan Supabase no saben si están usando el cliente real o el mock, porque ambos tienen la misma interfaz.
4. **Fácil de depurar**: los datos son predecibles y no cambian.
5. **Soporta todas las operaciones CRUD**: el mock responde a consultas de lectura, inserción, actualización y borrado.

---

## 8. El panel de administración (Admin CRUD)

### ¿Qué es CRUD?

CRUD son las 4 operaciones básicas que se pueden hacer con datos: **C**reate (Crear), **R**ead (Leer), **U**pdate (Actualizar), **D**elete (Eliminar).

**Analogía:** Es como el panel de control de un blog. Desde ahí puedes escribir un nuevo artículo (Create), ver los que tienes (Read), modificar uno existente (Update) o borrarlo (Delete).

### 8.1. Admin Cursos (`/admin/Cursos`) — El más completo

**Componentes que usa:**
1. `NewCursoForm` — Crear cursos
2. `DeleteCursoForm` — Eliminar cursos
3. `EditCursoForm` — Modificar cursos

#### NewCursoForm — Insertar un nuevo curso

**Cómo funciona paso a paso:**

1. El usuario ve un formulario con campos: Título, Categoría, Academia, Precio.
2. Rellena los campos y hace clic en "Insertar Curso".
3. Cuando hace clic, se ejecuta la función `onSubmit`:

```tsx
const onSubmit = async (data) => {
    setLoading(true)           // Muestra "Insertando..."
    setMessage(null)           // Borra mensajes anteriores
    try {
      await insertCurso(data)  // Envía los datos a Supabase
      setMessage({ type: 'success', text: '✓ Curso insertado correctamente' })
      reset()                  // Limpia el formulario
    } catch (error) {
      setMessage({ type: 'error', text: '✗ Error al insertar el curso.' })
    } finally {
      setLoading(false)
    }
}
```

4. Si funciona, se muestra un mensaje verde de éxito. Si falla, un mensaje rojo de error.
5. Después de 5 segundos, el mensaje desaparece automáticamente (`setTimeout`).

#### DeleteCursoForm — Eliminar un curso

1. Al cargar el componente, se ejecuta `useEffect` que llama a `getCursos()` para llenar un desplegable con todos los cursos.
2. El usuario selecciona un curso del desplegable.
3. Hace clic en "Eliminar Curso".
4. Se llama a `deleteCurso(selectedId)` que borra el curso en Supabase.
5. Se actualiza la lista local con `setCursos(prev => prev.filter(c => c.curso_id !== selectedId))` — esto quita el curso eliminado de la lista visible sin tener que recargar.

**Detalle importante:** El botón de eliminar se deshabilita si no hay un curso seleccionado (`disabled={loading || !selectedId}`).

#### EditCursoForm — Modificar un curso existente

**Cómo funciona paso a paso:**

1. Al cargar, obtiene todos los cursos de Supabase y los muestra en una tabla.
2. El usuario hace clic en "Editar" junto al curso que quiere modificar.
3. Se ejecuta `seleccionarCurso(curso)` que carga los datos del curso en el formulario de edición.
4. El usuario modifica los campos y hace clic en "Guardar Cambios".
5. Se llama a `updateCurso(cursoSeleccionado.curso_id, camposActualizados)` que envía los cambios a Supabase.
6. El formulario se limpia y la tabla de cursos se refresca.

**Patrón interesante:** Usa `const { curso_id, ...camposActualizados } = data` para separar el ID (que no se modifica) de los campos a actualizar. Esto se llama **destructuring** en JavaScript.

### 8.2. Admin Formación (`/admin/Formacion`)

Solo tiene `NewFormacionForm` — un formulario para insertar formación. **No tiene formularios de eliminar ni modificar**.

### 8.3. Admin Servicios (`/admin/Servicios`)

Solo tiene `NewServicioForm` — formulario para insertar servicios. **No tiene ni eliminar ni modificar**.

### 8.4. Admin Trabajos (`/admin/Trabajos`)

Solo tiene `NewTrabajoForm` — formulario para insertar trabajos. **No tiene ni eliminar ni modificar**.

✅ **Bien implementado:** El CRUD de cursos es completo y funcional (Crear, Leer, Actualizar, Eliminar).
⚠️ **A mejorar:** Las demás entidades (Formación, Servicios, Trabajos) solo tienen formulario de inserción, no de modificación ni eliminación. El CRUD está incompleto para ellas.

### El panel lateral del admin

El `BackendLayout` utiliza `SidebarProvider`, `AppSidebar` y `SidebarInset` para crear una interfaz de administración con:
- **Sidebar izquierdo** con enlaces a Formación, Servicios, Trabajos, Cursos.
- **Sección de Ajustes/Ayuda/Salir** en la parte inferior.
- **Header superior** con título "Documentos".
- **Avatar de usuario** con menú desplegable.

⚠️ **A mejorar:** El panel de admin **no tiene autenticación**. Cualquiera que sepa la URL `/admin` puede acceder. Los componentes de admin contienen varios placeholder visuales (secciones de "Documentos", "Quick Create", "Inbox") que parecen ser restos de una plantilla de shadcn y no tienen funcionalidad real.

---

## 9. El sistema de estado con useState y useEffect ⭐

### ¿Qué es el "estado" en React?

**Analogía:** El estado es como la **memoria a corto plazo** de un componente. Cuando cambias algo en la pantalla (escribes en un input, abres una descripción, cargas datos...), esos cambios se guardan en el "estado". React vigila el estado, y cuando cambia, React vuelve a pintar automáticamente el componente para reflejar los cambios.

### Todos los `useState` del proyecto

Los listaré por archivo, explicando qué guarda cada uno y cuándo cambia:

#### En `Formacion.tsx` (componente FormacionCard)
```tsx
const [expanded, setExpanded] = useState(false);
```
- **Qué guarda:** Si la descripción está expandida (`true`) o contraída (`false`).
- **Cuándo cambia:** Al hacer clic en "[ + ver más ]" o "[ — ocultar ]".

#### En `Contacto.tsx`
```tsx
const [agreed, setAgreed] = useState(false)          // Checkbox de privacidad
const [form, setForm] = useState({ nombre: '', apellido: '', email: '', mensaje: '' })
```
- **Qué guarda:** `agreed` guarda si el usuario aceptó la política de privacidad; `form` guarda los datos del formulario.
- **Cuándo cambia:** Cada vez que el usuario escribe en un input (cambio en `form`) o marca el checkbox (cambio en `agreed`).

#### En `Curso.tsx`
```tsx
const [cursos, setCursos] = useState([]);
```
- **Qué guarda:** La lista de cursos obtenidos de Supabase.

#### En `Trabajos.tsx`
```tsx
const [trabajos, setTrabajos] = useState([]);
```
- **Qué guarda:** La lista de trabajos obtenidos de Supabase.

#### En `TrabajoCard.tsx`, `FormacionCard.tsx`, `ServicioCard.tsx`
```tsx
const [expanded, setExpanded] = useState(false);
```
- **Qué guarda:** Si la descripción está expandida o no.

#### En `NewCursoForm.tsx`
```tsx
const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
const [loading, setLoading] = useState(false)
```
- **Qué guarda:** `message` guarda el mensaje de feedback (éxito/error) o `null` si no hay mensaje; `loading` indica si se está procesando una operación.

#### En `DeleteCursoForm.tsx`
```tsx
const [cursos, setCursos] = useState<ICurso[]>([])
const [selectedId, setSelectedId] = useState<string>("")
const [message, setMessage] = useState(...)
const [loading, setLoading] = useState(false)
```
- `cursos`: Lista de cursos para el desplegable.
- `selectedId`: ID del curso seleccionado para eliminar.

#### En `UpdateCursoForm.tsx`
```tsx
const [cursos, setCursos] = useState<ICurso[]>([])
const [cursoSeleccionado, setCursoSeleccionado] = useState<ICurso | null>(null)
const [message, setMessage] = useState(...)
const [loading, setLoading] = useState(false)
const [loadingLista, setLoadingLista] = useState(true)
```
- `cursoSeleccionado`: El curso que se está editando actualmente (o `null` si no hay ninguno).

#### En `use-mobile.ts`
```tsx
const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
```
- **Qué guarda:** Si la pantalla es móvil o no.

### Todos los `useEffect` del proyecto

#### En `Curso.tsx`
```tsx
useEffect(() => {
    obtenerCursos();
}, [])
```
- **Qué hace:** Llama a `obtenerCursos()` (que fetchea datos de Supabase) **cuando el componente se monta por primera vez**.
- **¿Por qué el `[]` vacío?** El array vacío significa "ejecútame solo una vez, al cargar". Sin él, se ejecutaría cada vez que el componente se actualiza, creando un bucle infinito.

#### En `Trabajos.tsx`
```tsx
useEffect(() => {
    obtenerTrabajos();
}, [])
```
- Mismo patrón que Cursos.

#### En `DeleteCursoForm.tsx`
```tsx
useEffect(() => {
    getCursos().then(setCursos)
}, [])
```
- Carga la lista de cursos al montar el formulario.

#### En `UpdateCursoForm.tsx`
```tsx
useEffect(() => {
    cargarCursos()
}, [])
```
- Carga los cursos al montar el componente de edición.

#### En `use-mobile.ts`
```tsx
React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: 767px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < 768)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < 768)
    return () => mql.removeEventListener("change", onChange)
}, [])
```
- **Qué hace:** Detecta si la pantalla es menor de 768px (móvil/tablet). Se ejecuta al cargar y cada vez que la ventana cambia de tamaño. Devuelve una función de limpieza (elimina el listener) para evitar fugas de memoria.

### El patrón típico: "Cargo datos al montar el componente"

Este es el patrón más importante del proyecto y se repite en Cursos y Trabajos:

```
1. useState([])          → Creo un "cajón vacío" para guardar los datos
2. async function fn()   → Defino una función que va a buscar datos a Supabase
3.   const data = await getX()   → Llamo a la API
4.   setX(data)                  → Meto los datos en el cajón
5. useEffect(() => { fn() }, []) → Cuando el componente se muestra, ejecuto la función
6. {datos.map(...)}      → Pinto los datos con un map
```

**Por qué funciona:** React llama a `useEffect` automáticamente cuando el componente aparece en pantalla. Eso dispara la función que obtiene los datos. Cuando los datos llegan, `setX` actualiza el estado, y React vuelve a pintar el componente con los datos ya cargados.

✅ **Bien implementado:** Uso correcto de `useEffect` con dependencias vacías para carga inicial, estados de loading y feedback para el usuario en los formularios.
⚠️ **A mejorar:** No hay estado de "cargando" en las páginas públicas (Cursos, Trabajos) — mientras los datos llegan de Supabase, se ve la página vacía o el mensaje "No hay cursos disponibles" durante un instante.

---

## 10. TypeScript: los tipos e interfaces

### ¿Qué es TypeScript y por qué ayuda?

**Analogía:** Imagina que guardas cosas en cajas. Sin TypeScript, las cajas no tienen etiqueta — puedes meter un zapato donde debería ir un plato y no te enteras hasta que abres la caja. Con TypeScript, **etiquetas cada caja** antes de guardar: "esta caja solo acepta números", "esta solo acepta objetos con título y precio". Si intentas meter algo que no corresponde, TypeScript te avisa **antes** de que el programa se ejecute.

### Interfaces del proyecto

#### ICurso
```tsx
export interface ICurso {
    curso_id:   string;     // Identificador único del curso
    titulo:     string;     // Nombre del curso
    categoria:  string;     // Categoría (ej: "Programación", "Redes")
    academia:   string;     // Institución que lo imparte
    precio:     number;     // Precio en euros
}
```

#### IFormacion
```tsx
export interface IFormacion {
    formacion_id:   string;     // ID único
    titulo:         string;     // Título de la formación
    subtitulo:      string;     // Subtítulo
    descripcion:    string;     // Descripción larga
    centro:         string;     // Centro educativo
    estado:         string;     // "En curso" / "Completado"
    fecha:          string;     // Fecha
    imagen:         string;     // URL de imagen
    categoria:      string;     // Categoría
    autor_nombre:   string;     // Nombre del autor/profesor
}
```

#### IServicio
```tsx
export interface IServicio {
    servicio_id:     string;     // ID único
    nombre:          string;     // Nombre del servicio
    descripcion:     string;     // Descripción
    tipo:            string;     // Tipo de servicio
    precio:          string;     // Precio (es string, no number)
    caracteristicas: string;     // Características (separadas por coma)
    icono:           string;     // Nombre del icono
}
```

#### ITrabajo
```tsx
export interface ITrabajo {
    trabajo_id:  string;     // ID único
    titulo:      string;     // Título del proyecto
    descripcion: string;     // Descripción
    empresa:     string;     // Empresa/cliente
    fecha:       string;     // Fecha
    tecnologias: string[];   // Array de tecnologías (ej: ["React", "Node.js"])
    enlace:      string;     // URL del proyecto
    imagen:      string;     // URL de la imagen
}
```

### ¿Por qué empezar con `I`?

La `I` inicial es una convención de nomenclatura que indica "Interface". No es obligatoria, pero ayuda a identificar rápidamente que es un tipo, no un valor.

### ⚠️ Inconsistencias encontradas

Algunos componentes importan nombres en plural (`IServicios`, `ITrabajos`) cuando las interfaces exportadas son singular (`IServicio`, `ITrabajo`). Esto podría causar errores de compilación:

- `NewServicioForm.tsx` y `ServicioCard.tsx` importan `IServicios` pero la interface exportada es `IServicio`
- `NewTrabajoForm.tsx` y `TrabajoCard.tsx` importan `ITrabajos` pero la interface exportada es `ITrabajo`

---

## 11. El diseño visual: Tailwind CSS y shadcn/ui

### ¿Qué es Tailwind CSS?

**Analogía:** Normalmente, para dar estilo a una web, escribes CSS a medida para cada elemento. Tailwind es como tener **un enorme juego de piezas de LEGO pre-hechas**: en lugar de construir cada adorno desde cero, simplemente eliges piezas que ya existen. Por ejemplo, en lugar de escribir `font-size: 14px; color: blue; margin-top: 10px;`, escribes `text-sm text-blue-500 mt-2.5`.

Todo el diseño del portfolio usa **clases de Tailwind directamente en el HTML**. No hay archivos CSS personalizados (salvo las variables de tema y las configuraciones de shadcn).

### ¿Qué es shadcn/ui?

No es una librería que se instala como dependencia, sino un conjunto de **componentes copiados al proyecto**. Cada componente (Button, Card, Input, Sidebar, etc.) está en `src/components/ui/` y es totalmente editable. La ventaja es que tienes el control total del código de cada componente.

### El tema oscuro

El proyecto usa un **tema oscuro personalizado** con esta paleta:
- **Fondo principal:** `#050d1a` (azul muy oscuro, casi negro)
- **Color de acento (cyan):** `#00c8ff` (azul eléctrico brillante)
- **Texto claro:** `#c9d8f0` / `#e8f4ff`
- **Texto secundario:** `#5a8fa8` / `#7fa8c0` (azules grisáceos)

### El sistema de variables CSS

En `src/App.css` y `src/index.css` se definen variables CSS para el tema, usando el formato `oklch` (un espacio de color moderno):

```css
:root {   /* Modo claro */
    --background: oklch(1 0 0);   /* Blanco */
    --foreground: oklch(0.145 0 0);  /* Casi negro */
    --primary: oklch(0.205 0 0);
    /* ... más variables ... */
}

.dark {   /* Modo oscuro (activo por defecto en el portfolio) */
    --background: oklch(0.145 0 0);   /* Fondo oscuro */
    --foreground: oklch(0.985 0 0);   /* Texto claro */
    --primary: oklch(0.922 0 0);
    /* ... */
}
```

Luego, en `@theme inline` se mapean estas variables a nombres de clase de Tailwind:

```css
@theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-primary: var(--primary);
    /* ... */
}
```

Esto permite usar clases como `bg-background`, `text-foreground`, `border-border`, etc.

### Fondo de rejilla y animaciones

Todas las páginas tienen un fondo de **rejilla** (cuadrícula de 40x40px) creado con CSS:

```tsx
style={{
  backgroundImage:
    "linear-gradient(rgba(0,200,255,0.04) 1px, transparent 1px), linear-gradient(90deg, ...)",
  backgroundSize: "40px 40px",
}}
```

Y una **línea de barrido** (scan line) que se mueve verticalmente con una animación CSS:

```tsx
<div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,200,255,0.4)] to-transparent animate-[scan_4s_linear_infinite]" />
```

La animación `scan` recorre la pantalla cada 4 segundos, dando un efecto "cyberpunk/matrix".

### Tipografía

Se usa la fuente **Geist Variable** (de Vercel), cargada desde el paquete `@fontsource-variable/geist`. Es una fuente sans-serif moderna y elegante.

---

## 12. Preguntas que me pueden hacer y sus respuestas

### P1: ¿Por qué usaste React y no otra tecnología como HTML+CSS plano?

**Respuesta:** Porque React me permite dividir la web en **componentes reutilizables** (como piezas de LEGO). En lugar de repetir el mismo código en cada página, creo un componente `Header` una vez y lo uso en todas las páginas. Además, React actualiza automáticamente la pantalla cuando los datos cambian, sin tener que recargar la página. También es la tecnología más demandada en el mercado laboral actual para desarrollo frontend.

### P2: ¿Qué es un componente?

**Respuesta:** Un componente es una **pieza independiente de la interfaz**, como un sello. El Header es un componente, el Footer es otro, cada tarjeta de curso es otro. Cada componente tiene su propio código, su propio estilo y, si lo necesita, su propio "estado" (memoria interna). Los componentes se pueden reutilizar y combinar como piezas de LEGO.

### P3: ¿Cómo funciona el `.map()` de los proyectos?

**Respuesta:** El `.map()` es como una **cadena de montaje**: cojo un array (una lista) de elementos (por ejemplo, 4 cursos), y por cada uno de ellos ejecuto una función que devuelve un trozo de HTML. El resultado es un array de trozos HTML que React pinta en pantalla. Es como tener una lista de la compra y, por cada artículo, escribir una tarjeta.

### P4: ¿Qué pasa si Supabase falla?

**Respuesta:** El proyecto tiene un **sistema Mock** que lo soluciona. Si no hay variables de entorno configuradas (VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY), el sistema automáticamente usa datos ficticios realistas. Esto significa que la web funciona aunque no haya conexión a internet o la base de datos no esté disponible. Es como tener un "simulacro" de la base de datos dentro del propio código.

### P5: ¿Qué es TypeScript y para qué lo usaste?

**Respuesta:** TypeScript es un "superconjunto" de JavaScript que añade **tipos**. Es como etiquetar cada variable: "esto es un número", "esto es un objeto con título y precio". TypeScript revisa el código antes de ejecutarlo y detecta errores como "estás intentando usar un número como si fuera un texto". Lo usé para que el código sea más robusto y fácil de mantener.

### P6: ¿Qué es Vite?

**Respuesta:** Vite es una herramienta que **acelera el desarrollo**. En lugar de empaquetar todo el código cada vez que hago un cambio, Vite solo actualiza la parte que cambié, lo que hace que los cambios se vean al instante. También optimiza el código cuando lo paso a producción para que pese menos y cargue más rápido.

### P7: ¿Cómo funciona el enrutamiento?

**Respuesta:** El enrutamiento decide **qué página mostrar según la URL**. Funciona como el índice de un libro: si la URL es `/cursos`, el router busca la ruta que coincide y renderiza el componente `Cursos`. Si la URL no coincide con ninguna ruta, se muestra la página de error 404. Todo esto ocurre sin recargar la página del navegador, lo que hace la navegación más rápida y suave.

### P8: ¿Qué es un hook?

**Respuesta:** Un hook es una **función especial de React** que permite usar características como el estado o los efectos secundarios dentro de un componente. El hook más usado en este proyecto es `useState`, que crea una "variable con memoria" que React vigila para actualizar la pantalla cuando cambia. Otro es `useEffect`, que ejecuta código cuando el componente aparece o se actualiza.

### P9: ¿Cómo protegiste el panel de administración?

**Respuesta:** **No está protegido**. Actualmente, el panel de administración es accesible simplemente escribiendo `/admin` en la URL. No hay sistema de autenticación (login/contraseña). Es una **carencia importante** que habría que resolver. Una solución sería implementar autenticación con Supabase Auth o con un proveedor como Google/Auth0.

### P10: ¿Qué es el estado en React?

**Respuesta:** El estado es la **memoria interna** de un componente. Por ejemplo, el estado `expanded` en las tarjetas recuerda si la descripción está visible u oculta. Cuando el estado cambia (el usuario hace clic), React vuelve a pintar automáticamente la parte de la pantalla que depende de ese estado. Es como un interruptor: cuando cambia, la luz (la pantalla) cambia.

### P11: ¿Qué librerías externas usaste y por qué?

**Respuesta:** Las principales son:
- **React Router** — para tener múltiples páginas sin recargar.
- **Supabase JS** — para conectarme a la base de datos en la nube.
- **Tailwind CSS** — para dar estilo de forma rápida con clases prehechas.
- **shadcn/ui** — para tener componentes accesibles y bonitos (botones, tarjetas, inputs).
- **react-hook-form** — para manejar formularios de forma más limpia en el panel de admin.
- **Lucide React** — para iconos en el panel de administración.
- **Sonner** — para notificaciones (aunque parece no estar usado aún).

### P12: ¿Qué es la "rejilla" que se ve de fondo?

**Respuesta:** Es un efecto visual creado con CSS. En lugar de usar una imagen de fondo, dibujo líneas horizontales y verticales con una opacidad muy baja (4%) formando una cuadrícula de 40x40 píxeles. Esto da un aspecto técnico, como una interfaz de monitor antiguo o estilo "matrix". Además, hay una línea animada que baja lentamente por la pantalla simulando un barrido.

### P13: ¿Cómo se actualiza la pantalla después de insertar o eliminar datos?

**Respuesta:** En los formularios de admin, después de insertar o eliminar, se actualiza el estado local del componente. Por ejemplo, en `DeleteCursoForm`, después de eliminar un curso, se filtra el array local con `.filter()` para quitar el curso borrado: `setCursos(prev => prev.filter(c => c.curso_id !== selectedId))`. Así la lista visible se actualiza al instante sin recargar la página.

### P14: ¿Por qué algunas páginas tienen datos fijos y otras vienen de base de datos?

**Respuesta:** Las páginas de **Home, Formación y Servicios** tienen los datos escritos directamente en el código (hardcodeados) porque son datos que cambian poco: mi nombre, mi stack técnico, mi formación principal. Las páginas de **Cursos y Trabajos** obtienen los datos de Supabase porque están pensadas para que yo pueda añadir, modificar o quitar contenido desde el panel de administración sin tocar el código.

### P15: ¿Qué fallos o mejoras le ves al proyecto?

**Respuesta sincera:** Varias:
1. **El formulario de contacto no funciona** — el botón de enviar no envía nada.
2. **El panel de admin no tiene login** — cualquiera que sepa la URL puede entrar.
3. **Los datos de Formación y Servicios están hardcodeados** — no se pueden gestionar desde el admin aunque hay formularios para insertarlos.
4. **Algunos imports de TypeScript están mal** (importan `IServicios` cuando la interfaz se llama `IServicio`), lo que podría dar errores al compilar.
5. **No hay feedback de carga** en las páginas de Cursos y Trabajos — mientras los datos llegan de Supabase, la página se ve vacía.
6. **Los botones de Home ("Ver proyectos", "Contactar") no redirigen** a las páginas reales.

### P16: ¿Qué harías si tuvieras más tiempo?

**Respuesta:** Implementaría autenticación para el panel de admin, conectaría el formulario de contacto a un servicio real de envío de correos (EmailJS o Formspree), completaría el CRUD para todas las entidades (poder modificar y eliminar formación, servicios y trabajos), añadiría una página de carga mientras se obtienen datos de Supabase, y mejoraría el diseño responsive para móviles.

### P17: ¿Qué es el `useEffect` y por qué tiene `[]`?

**Respuesta:** `useEffect` ejecuta código cuando el componente se **monta** (aparece) o cuando ciertos valores cambian. El `[]` vacío significa "ejecuta esto solo una vez, justo cuando el componente aparece por primera vez". Sin el `[]`, se ejecutaría cada vez que el componente se actualiza, lo que provocaría un bucle infinito de llamadas a Supabase.

### P18: ¿Cómo creaste el proyecto desde cero?

**Respuesta:** Usé el comando `npm create vite@latest portfolio-luis -- --template react-ts` que crea un proyecto base con React + TypeScript ya configurados. Luego instalé las dependencias una a una: Tailwind CSS, React Router, Supabase, shadcn/ui, etc. El diseño visual lo fui construyendo componente por componente, inspirándome en portfolios tipo "cyberpunk/terminal".

### P19: ¿Qué es el `Outlet` en React Router?

**Respuesta:** `Outlet` es un **marcador de posición**. El `MainLayout` tiene un Header, un Footer y en medio un `<Outlet/>`. Cuando navegas a una página, el contenido de esa página se coloca automáticamente donde está el `Outlet`. Es como el hueco de una tostadora: el layout es la tostadora, y cada página es una rebanada de pan diferente.

### P20: ¿Cómo se gestionan los formularios en el admin?

**Respuesta:** Uso **react-hook-form**, una librería que simplifica el manejo de formularios. Con `useForm<ICurso>()` creo un formulario tipado. El `register` conecta cada input con el formulario, y `handleSubmit` valida y recoge los datos cuando se envía. Luego llamo a la función de Supabase correspondiente (insertar, actualizar) con los datos recogidos.

### P21: ¿Qué es el sistema Mock?

**Respuesta:** El sistema Mock es un **simulador de base de datos**. Cuando no hay conexión a Supabase, en lugar de que la web se rompa, un "cliente falso" llamado `MockQueryBuilder` responde a las mismas preguntas que harías a la base de datos real pero con datos ficticios guardados en el propio código. Es como tener un **libro de respuestas** dentro del programa: cuando preguntas "dame los cursos", el mock consulta su lista interna y te responde con 3 cursos de ejemplo. Esto permite que la web se pueda mostrar y probar en cualquier momento, incluso sin conexión a internet.

### P22: ¿Qué es una API fluida (fluent API)?

**Respuesta:** Es un estilo de programación donde puedes **encadenar métodos** uno detrás de otro. El mock de Supabase lo usa: puedes escribir `supabase.from('cursos').select().eq('curso_id', '1').single()`. Cada método devuelve el mismo objeto, permitiendo seguir añadiendo métodos. Es como una **frase** que se va construyendo: "de la tabla cursos → selecciona todo → donde el id sea '1' → y devuelve solo uno".

---

## Resumen del flujo completo de la aplicación

```
index.html
    └── <div id="root">
         └── main.tsx
              └── App.tsx
                   └── AppRouter.tsx
                        ├── MainLayout (Header + Outlet + Footer)
                        │    ├── Home (/)
                        │    ├── Formacion (/Formacion)
                        │    ├── Servicios (/servicios)
                        │    ├── Cursos (/cursos) ──► Supabase / Mock
                        │    ├── Contacto (/contacto)
                        │    ├── Trabajos (/Trabajos) ──► Supabase / Mock
                        │    └── NotFound (cualquier otra URL)
                        │
                        └── BackendLayout (Sidebar + Header + Outlet)
                             ├── AdminCursos (/admin/Cursos)
                             │    ├── NewCursoForm ──► Supabase / Mock (INSERT)
                             │    ├── DeleteCursoForm ──► Supabase / Mock (DELETE)
                             │    └── EditCursoForm ──► Supabase / Mock (UPDATE)
                             ├── AdminFormacion (/admin/Formacion)
                             │    └── NewFormacionForm ──► Supabase / Mock (INSERT)
                             ├── AdminServicios (/admin/Servicios)
                             │    └── NewServicioForm ──► Supabase / Mock (INSERT)
                             └── AdminTrabajos (/admin/Trabajos)
                                  └── NewTrabajoForm ──► Supabase / Mock (INSERT)
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
| **Layout** | Plantilla que envuelve varias páginas (Header + contenido + Footer) |
| **Outlet** | Hueco en el layout donde se inserta cada página |
| **Props** | Parámetros que se le pasan a un componente (como argumentos de una función) |
| **.map()** | Método que recorre una lista y devuelve un elemento por cada ítem |
| **Supabase** | Base de datos en la nube con API automática |
| **Mock** | Simulacro de base de datos que devuelve datos ficticios para que la web funcione sin conexión |
| **API Fluida** | Estilo de programación que permite encadenar métodos (`.from().select().eq().single()`) |
| **CRUD** | Crear, Leer, Actualizar, Eliminar — las 4 operaciones básicas con datos |
| **Tailwind CSS** | Sistema de estilos con clases prehechas (como piezas de LEGO) |
| **shadcn/ui** | Colección de componentes copiados al proyecto, no una librería externa |
| **TypeScript** | JavaScript con tipos — etiqueta las variables para evitar errores |
| **Vite** | Herramienta que acelera el desarrollo y optimiza el código final |
| **API** | Interfaz que permite a dos programas comunicarse (en este caso, la web con Supabase) |
| **Variable CSS** | Valor que se define una vez y se reutiliza en muchos sitios (ej: color principal) |
