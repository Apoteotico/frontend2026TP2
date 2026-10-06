# pITzza y birrAPI — TP2 React

[![React](https://img.shields.io/badge/React-18%2F19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v6-ca4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Deploy en Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://tp2-react-grupo21.vercel.app/)

> Aplicación Single Page (SPA) desarrollada en **React** para el **Trabajo Práctico Grupal 2** de *Desarrollo de Sistemas Web Front End* (IFTS 29 · 2do Cuatrimestre 2026).

---

## 📌 Índice
1. [Descripción del Proyecto](#-descripción-del-proyecto)
2. [Enlace al Deploy (Vercel)](#-enlace-al-deploy)
3. [Integrantes y Responsabilidades](#-integrantes-y-responsabilidades)
4. [Estructura de Navegación y Sidebar](#-estructura-de-navegación-y-sidebar)
5. [Módulos Principales de la Aplicación](#-módulos-principales-de-la-aplicación)
   - [Portada interactiva](#1-portada-interactiva)
   - [Perfiles individuales en React](#2-perfiles-individuales-en-react)
   - [Catálogo con 24 datos locales JSON](#3-catálogo-con-24-datos-locales-json)
   - [Consumo asíncrono de API Pública](#4-consumo-asíncrono-de-api-pública)
   - [Árbol de renderizado interactivo](#5-árbol-de-renderizado-interactivo)
   - [Bitácora de rodaje](#6-bitácora-de-rodaje)
6. [Árbol de Componentes](#-árbol-de-componentes)
7. [Tecnologías y Decisiones de Diseño](#-tecnologías-y-decisiones-de-diseño)
8. [Declaración Obligatoria de Uso de IA](#-declaración-obligatoria-de-uso-de-ia)
9. [Instalación y Ejecución Local](#-instalación-y-ejecución-local)

---

## 📖 Descripción del Proyecto
Continuando con la identidad desarrollada en el TP1, **pITzza y birrAPI** es la productora de software de un equipo de cinco estudiantes que fusiona el amor por el cine de culto, la pizza casera, la cerveza artesanal y el desarrollo web. 

Esta entrega traslada el sitio estático a una **Single Page Application en React**, implementando componentes modulares, enrutamiento con React Router, una **Sidebar compartida** para la navegación, manejo de estado reactivo mediante hooks (`useState`, `useEffect`, `useMemo`, `useCallback`), catálogo local con búsqueda y filtrado dinámico, consumo en vivo de una API pública y un visualizador del árbol de renderizado.

---

## 🚀 Enlace al Deploy
* **Sitio publicado en Vercel:** [https://tp2-react-grupo21.vercel.app/](https://tp2-react-grupo21.vercel.app/) *(URL del deploy grupal)*
* **Repositorio en GitHub:** [https://github.com/Apoteotico/TP2-React-Grupo21](https://github.com/Apoteotico/TP2-React-Grupo21)

---

## 👥 Integrantes y Responsabilidades

| Integrante | GitHub | Rol & Responsabilidad en el Proyecto | Perfil en App |
|---|---|---|---|
| **Guillermo Alberto Chacon** | [@GuiLeCha](https://github.com/GuiLeCha) | Coordinación técnica, diseño UX, interacción táctil de lluvia y contador con partículas en React. | [/perfil/guillermo-chacon](/perfil/guillermo-chacon) |
| **Florencia Lelis Guzmán** | [@fguzman3026](https://github.com/fguzman3026) | Maquetación responsive de la Sidebar, diseño de afiches y estados luminosos de cartelera. | [/perfil/florencia-guzman](/perfil/florencia-guzman) |
| **Sonia Raquel Andrada** | [@Raqu28](https://github.com/Raqu28) | Lógica de filtrado en el catálogo, notas interactivas de álbumes y accesibilidad. | [/perfil/sonia-andrada](/perfil/sonia-andrada) |
| **Eitel Hugo Belinzoni** | [@Apoteotico](https://github.com/Apoteotico) | Arquitectura del proyecto en Vite, configuración de React Router y estructuración del layout. | [/perfil/eitel-belinzoni](/perfil/eitel-belinzoni) |
| **Esteban Acosta** | [@otra-tecla](https://github.com/otra-tecla) | Integración del consumo de la API de cervecerías, estados de carga/error y contador de donaciones. | [/perfil/esteban-acosta](/perfil/esteban-acosta) |

---

## 🧭 Estructura de Navegación y Sidebar
* **Sidebar compartida (`<Sidebar />`):** Menú lateral presente en toda la experiencia con la marca visual del equipo y enlaces con estado activo (`NavLink`).
* **Adaptabilidad a móvil:** En pantallas menores a 900 px, la sidebar se convierte en un panel desplegable (*off-canvas drawer*) controlado mediante un botón hamburguesa en la barra superior móvil (`<MobileHeader />`).
* **Navegación sin depender de 'Atrás':** Cada pantalla cuenta con controles internos, enlaces contextuales y paginación circular para navegar libremente por la app sin recurrir a los controles del navegador.

---

## 🧩 Módulos Principales de la Aplicación

### 1. Portada Interactiva (`/`)
* Marquesina central con el propósito del equipo y los cuatro pilares (Cine, Pizza, Birra, Código).
* **Sorteador de la noche:** Módulo interactivo con React state que genera al instante un maridaje aleatorio de película, pizza, estilo de birra y desafío de código.
* Cuadrícula de afiches (formato 4:5) que da acceso directo a los perfiles de cada integrante.

### 2. Perfiles Individuales en React (`/perfil/:slug`)
* Ruta parametrizada por `slug` que renderiza la identidad, ficha técnica (ciudad, edad, GitHub, PFO1), cuatro habilidades, tres películas y tres discos favoritos.
* **Interacción funcional por integrante con hooks:**
  - **Guillermo:** Contador interactivo de rondas servidas (`useState`), mensajes rotativos, partículas de emojis que brotan desde el botón (`getBoundingClientRect`) y lluvia animada en `dvh`.
  - **Florencia:** Sorteo y resaltado dinámico de películas con marco dorado.
  - **Sonia:** Acordeón interactivo que despliega notas y curiosidades de discos.
  - **Eitel:** Rotador dinámico de frases sobre trabajo colaborativo y resiliencia.
  - **Esteban:** Contador de birras artesanales donadas con mensajes de agradecimiento.
* Paginación circular (`.btn-prev` y `.btn-next`) con cálculo dinámico del integrante anterior y siguiente.

### 3. Catálogo con 24 Datos Locales JSON (`/catalogo`)
* Archivo [`src/data/catalogo.json`](src/data/catalogo.json) con **24 registros completos** (superando el requisito de 20).
* **Buscador en tiempo real:** Filtra por texto en título, película, director, pizza, birra o proyecto.
* **Filtros por propiedad:** Filtro por estilo de cerveza (IPA, Stout, Red Ale, Golden, APA, Honey) y por dificultad técnica (Principiante, Intermedio, Avanzado).
* Estado de "sin resultados" con botón para restablecer.
* **Modal de detalle:** Cada registro permite abrir una vista modal para consultar la sinopsis maridada y la receta completa.

### 4. Consumo Asíncrono de API Pública (`/api`)
* Conexión con **[Open Brewery DB](https://api.openbrewerydb.org/)** (API pública sin claves privadas).
* Selector de capitales cerveceras (San Diego, Portland, Denver, Austin, Chicago).
* **Manejo de estados asíncronos:**
  - `cargando`: Spinner visual con mensaje amigable.
  - `error`: Cartel de error ante caídas de red o fallas HTTP.
  - `reintentar`: Botón interactivo para reintentar la solicitud o refrescar datos.
  - Botón adicional para simular error de red y validar la tolerancia a fallos.

### 5. Árbol de Renderizado Interactivo (`/arbol`)
* Representación gráfica y jerárquica de la arquitectura de componentes de la aplicación.
* Cumple la recomendación pedagógica del docente de mantener una jerarquía limpia (máximo 3-4 niveles de profundidad).
* **Interactividad (Nivel Propone):** Permite **expandir y contraer nodos** de forma individual o masiva ("Expandir todo" / "Contraer todo"), detallando las `props` recibidas y el `estado` administrado por cada componente.

### 6. Bitácora de Rodaje (`/bitacora`)
* 7 entradas detalladas que registran el proceso de trabajo del equipo desde el inicio hasta el TP2.
* Filtro en tiempo real por categoría (*arquitectura, react, componentes, api, responsive, ux*).
* Acordeones interactivos para desplegar y contraer la decisión, dificultad y resolución de cada hito.

---

## 🌳 Árbol de Componentes

```text
<App /> (BrowserRouter + Routes)
  └── <Layout /> (Sidebar + MobileHeader + Footer)
        ├── <Sidebar /> (Identidad + NavLinks + Integrantes)
        ├── <MobileHeader /> (Logo + Botón Hamburguesa)
        ├── <Outlet />
        │     ├── <Home />
        │     │     ├── <HeroMarquesina />
        │     │     ├── <SorteadorNoche />
        │     │     └── <MemberCard /> (x5)
        │     ├── <Perfil />
        │     │     ├── <ProfileHead />
        │     │     ├── <FavoritosBoard />
        │     │     ├── <InteraccionIndividual />
        │     │     └── <PagerNavigation />
        │     ├── <Catalogo />
        │     │     ├── <FiltrosBar />
        │     │     ├── <CatalogoCard /> (x24)
        │     │     └── <DetalleModal />
        │     ├── <ApiConsumo />
        │     │     ├── <ApiControlPanel />
        │     │     ├── <LoadingSpinner />
        │     │     ├── <ErrorAlert />
        │     │     └── <BreweryCard /> (x12)
        │     ├── <ArbolRender />
        │     │     └── <TreeNode /> (recursivo y colapsable)
        │     └── <Bitacora />
        │           ├── <CategoryFilter />
        │           └── <LogCard /> (acordeón x7)
        └── <Footer />
```

---

## 🎨 Tecnologías y Decisiones de Diseño
* **React 18 / 19** con functional components y hooks.
* **Vite** como empaquetador ultrarrápido y herramienta recomendada oficialmente.
* **React Router v6** para el manejo de rutas del lado del cliente.
* **Google Fonts:** *Fraunces* (títulos de corte cinematográfico) y *Outfit* (texto legible y moderno).
* **Paleta cromática:** Tomate (`#c8452c`), Dorado Birra (`#e8a72b`), Albahaca (`#3f7d5c`), Azul Código (`#2b6f8f`), Tinta (`#12100e`) y Papel Crema (`#fdf8f0`).
* **Diseño adaptativo:** Breakpoints testeados en 400 px (una sola columna estricta sin desbordes), 900 px y 1200 px.

---

## 🤖 Declaración Obligatoria de Uso de IA

| Integrante | Herramienta / Aplicación | Modelo de IA | Tareas en las que asistió | Criterio de adaptación humana |
|---|---|---|---|---|
| **Guillermo Chacon** | Google Antigravity / Claude Code | Gemini 1.5 Pro & Claude 3.5 Sonnet | Estructuración de la SPA en React, cálculo de partículas relativas con `getBoundingClientRect` para móviles, y maquetación del componente del árbol de renderizado interactivo. | Se revisó que la lógica no utilizara librerías externas pesadas y que el efecto fuera completamente accesible con `prefers-reduced-motion`. |
| **Florencia Guzmán** | ChatGPT (Plan gratuito) | GPT-4o mini | Generación y redacción de la lista de películas favoritas y sugerencias de contraste accesible en CSS. | Se descartaron propuestas visuales genéricas para mantener la paleta institucional de *pITzza y birrAPI*. |
| **Sonia Andrada** | v0 by Vercel | Claude 3.5 Sonnet | Exploración inicial de layouts tipo sidebar y tarjetas con filtros. | El código generado fue refactorizado a componentes limpios sin dependencias de Tailwind para usar CSS puro. |
| **Eitel Belinzoni** | GitHub Copilot | GPT-4o | Autocompletado de tipos de birra y sinopsis del catálogo JSON local. | Se corrigieron las descripciones y se verificó que cada entrada tuviera relación directa con la propuesta del equipo. |
| **Esteban Acosta** | Perplexity AI | Sonar Medium | Búsqueda de APIs públicas abiertas sin claves y documentación del endpoint de Open Brewery DB. | Se implementó el control de errores propio y la simulación para cumplir con el criterio 12 de la rúbrica. |

---

## 🛠️ Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Apoteotico/TP2-React-Grupo21.git
   cd TP2-React-Grupo21
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abrir en el navegador en [http://localhost:5173](http://localhost:5173).

4. **Compilar para producción:**
   ```bash
   npm run build
   ```
