export const bitacoraEntries = [
  {
    id: 1,
    fecha: "2026-09-10",
    titulo: "Kickoff y definición de la identidad 'pITzza y birrAPI'",
    categoria: "arquitectura",
    decision: "Adoptar una identidad de grupo que combine el cine de culto, la pizzería clásica, la cervecería artesanal y el desarrollo web / API.",
    dificultad: "Elegir un concepto que representara la personalidad de los 4 integrantes sin dispersar la temática técnica.",
    resolucion: "Se creó la paleta con tonos tomate (#c8452c), birra (#e8a72b), tinta (#12100e) y crema (#fdf8f0), con tipografías Fraunces y Outfit."
  },
  {
    id: 2,
    fecha: "2026-09-17",
    titulo: "Estructuración de perfiles y navegación sin botón atrás",
    categoria: "ux",
    decision: "Implementar un recorrido circular entre los 4 integrantes con botones 'Anterior' y 'Siguiente' en cada tarjeta de perfil.",
    dificultad: "Lograr que ningún usuario dependiera del botón Atrás del navegador para recorrer la totalidad del sitio.",
    resolucion: "Se maquetó una botonera compartida de paginación que enlaza Portada, Anterior, Siguiente y Bitácora en cada pantalla."
  },
  {
    id: 3,
    fecha: "2026-09-22",
    titulo: "Mejora responsive para móviles y experiencia táctil",
    categoria: "responsive",
    decision: "Ajustar las cards a una sola columna en pantallas de 400px o menos, hero al 100% dvh y partículas emergentes en el botón de Guillermo.",
    dificultad: "En celulares pequeños, 2 columnas comprimían los nombres y los emojis de lluvia caían fuera de vista al estar el botón al final.",
    resolucion: "Se aislaron las media queries a 1 columna en <= 400px y se calcularon coordenadas relativas al botón con `getBoundingClientRect()`."
  },
  {
    id: 4,
    fecha: "2026-09-28",
    titulo: "Transición a React: Diseño de arquitectura en componentes",
    categoria: "react",
    decision: "Migrar la aplicación completa a React con Vite y React Router, adoptando una Sidebar compartida como layout maestro.",
    dificultad: "Pasar de páginas HTML estáticas a un árbol de componentes modulares manteniendo una jerarquía limpia de hasta 4 niveles de anidamiento.",
    resolucion: "Se diseñó un `<Layout />` que aloja la `<Sidebar />` y renderiza el contenido mediante `<Outlet />` de React Router."
  },
  {
    id: 5,
    fecha: "2026-10-02",
    titulo: "Catálogo local de 20 maridajes del equipo y filtros en tiempo real",
    categoria: "componentes",
    decision: "Crear un archivo JSON local con 20 maridajes armados exclusivamente con las 12 películas y 12 discos favoritos de los 4 integrantes, combinados con las 5 pizzas, las 5 birras y los 8 proyectos de código definidos en el TP1.",
    dificultad: "Sincronizar el input de texto y los selectores por integrante, birra y dificultad para que convivan sin reiniciar el estado de la búsqueda.",
    resolucion: "Se implementó un filtrado reactivo con `useMemo` que cruza simultáneamente texto libre, integrante del equipo, estilo de birra y nivel del proyecto."
  },
  {
    id: 6,
    fecha: "2026-10-05",
    titulo: "Consumo de API pública (Apple iTunes API) con selectores en cascada",
    categoria: "api",
    decision: "Conectar la aplicación a la API pública 'Apple iTunes Search & Lookup' mediante menús desplegables en cascada cerrados al equipo (Integrante -> Sus Discos / Sus Películas) para consultar las canciones originales y bandas sonoras sin traer resultados ajenos.",
    dificultad: "Evitar que un buscador de texto libre devolviera películas o álbumes que no pertenecen al grupo y controlar adecuadamente la reproducción de audio sin pistas superpuestas.",
    resolucion: "Se implementaron tres selectores sincronizados en cascada con estados explícitos de `cargando`, `error` y `tracks`, consulta exacta por `collectionId` y un reproductor `<audio ref={audioRef}>` centralizado."
  },
  {
    id: 7,
    fecha: "2026-10-05",
    titulo: "Visualizador interactivo del árbol de renderizado",
    categoria: "react",
    decision: "Diseñar un componente interactivo que represente la jerarquía real de componentes de la aplicación con opción de expandir y contraer nodos.",
    dificultad: "Construir una visualización clara que no fuera una simple lista de archivos sino el árbol de render de React (App -> Layout -> Pages).",
    resolucion: "Se creó un componente recursivo con estado local de apertura/cierre de ramas y etiquetas visuales de props y estado."
  },
  {
    id: 8,
    fecha: "2026-10-06",
    titulo: "Integración estética del Layout, DesktopTopBar y scrollbar de gala",
    categoria: "ux",
    decision: "Rediseñar integralmente la Sidebar y el Layout maestro, incorporando una barra superior de escritorio (DesktopTopBar) con efecto vidrio (backdrop-filter: blur) y breadcrumb dinámico en tiempo real.",
    dificultad: "La barra lateral oscura flotaba desconectada frente al lienzo claro, con un scrollbar nativo gris antiestético, salto de línea en el logo y los integrantes inferiores cortados en pantallas estándar de laptop (768px-900px).",
    resolucion: "Se calibró el ancho a 290px, se ajustaron espaciados verticales para alojar los 4 integrantes sin desbordes, se estilizó un scrollbar ultra-fino de 4px en tonos ámbar, y se creó la clase .home-hero-marquee para dialogar armónicamente con la barra lateral."
  },
  {
    id: 9,
    fecha: "2026-10-12",
    titulo: "Rutas avanzadas (useSearchParams, useNavigate), PropTypes y Selector de Iluminación",
    categoria: "react",
    decision: "Incorporar sincronización bidireccional de búsqueda y filtros con la URL vía useSearchParams en el catálogo, navegación programática con useNavigate desde el sorteador de la portada, conmutador de tema Día/Noche con persistencia en localStorage, y modularización de tarjetas y modales con validación formal de PropTypes.",
    dificultad: "Evitar desincronizaciones entre el estado de los inputs y los parámetros de consulta al compartir enlaces o recargar, asegurando que las props cumplan estrictamente los contratos esperados.",
    resolucion: "Se unificó el manejo de URLSearchParams con replace: true en tiempo real y se definieron esquemas estrictos de PropTypes.shape en CardMaridaje y DetalleModal para detectar discrepancias en desarrollo."
  },
  {
    id: 10,
    fecha: "2026-10-15",
    titulo: "Cartelera Multimedia Interactiva: Tráilers en Modal y Audio Previews con useRef()",
    categoria: "react",
    decision: "Enriquecer las 12 películas y 12 discos favoritos de los integrantes con recursos multimedia de uso libre: pósters oficiales con apertura de tráiler en ventana modal (<TrailerModal />) y portadas de álbumes con reproducción de fragmentos musicales de 30 segundos controlados mediante el hook useRef().",
    dificultad: "Garantizar que la reproducción de un disco o la apertura de un tráiler detenga automáticamente cualquier pista previa sin provocar fugas de audio al navegar entre perfiles.",
    resolucion: "Se centralizó una única etiqueta <audio ref={audioRef}> imperativa en Perfil.jsx sincronizada con un efecto de limpieza al cambiar el parámetro :slug y al abrir el modal de video."
  },
  {
    id: 11,
    fecha: "2026-10-28",
    titulo: "Unificación cromática de Modo Día/Noche y corrección de cabecera en móviles",
    categoria: "ux",
    decision: "Unificar las superficies estructurales (Sidebar, Topbar, Lienzo y Footer) bajo un sistema de variables CSS para que respondan de forma pareja al cambio entre Modo Día y Modo Noche, y rediseñar el Hero de portada en dos columnas equilibradas resaltando las siglas tecnológicas 'IT' y 'API'.",
    dificultad: "En Modo Día la barra lateral, el pie de página y el banner principal conservaban fondos oscuros fijos que rompían la armonía visual; además, al probar en un celular real se detectó que la barra superior de escritorio no se ocultaba en pantallas menores a 900px y se superponía con el encabezado móvil.",
    resolucion: "Se migraron los colores fijos de Sidebar, Footer y Hero a variables reactivas según el tema activo, y se añadió `display: none` para `.desktop-topbar` en el breakpoint móvil (`<= 900px`)."
  }
];
