export const bitacoraEntries = [
  {
    id: 1,
    fecha: "2026-09-10",
    titulo: "Kickoff y definición de la identidad 'pITzza y birrAPI'",
    categoria: "arquitectura",
    decision: "Adoptar una identidad de grupo que combine el cine de culto, la pizzería clásica, la cervecería artesanal y el desarrollo web / API.",
    dificultad: "Elegir un concepto que representara la personalidad de los 5 integrantes sin dispersar la temática técnica.",
    resolucion: "Se creó la paleta con tonos tomate (#c8452c), birra (#e8a72b), tinta (#12100e) y crema (#fdf8f0), con tipografías Fraunces y Outfit."
  },
  {
    id: 2,
    fecha: "2026-09-17",
    titulo: "Estructuración de perfiles y navegación sin botón atrás",
    categoria: "ux",
    decision: "Implementar un recorrido circular entre los 5 integrantes con botones 'Anterior' y 'Siguiente' en cada tarjeta de perfil.",
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
    dificultad: "Pasar de páginas HTML estáticas a un árbol de componentes modulares sin superar los 4 niveles de anidamiento sugeridos en clase.",
    resolucion: "Se diseñó un `<Layout />` que aloja la `<Sidebar />` y renderiza el contenido mediante `<Outlet />` de React Router."
  },
  {
    id: 5,
    fecha: "2026-10-02",
    titulo: "Catálogo local de 24 maridajes y filtros en tiempo real",
    categoria: "componentes",
    decision: "Crear un archivo JSON local con 24 maridajes de cine, pizza, birra y código, agregando búsqueda en vivo y filtros por categoría.",
    dificultad: "Sincronizar el input de texto y los selectores para que convivan sin reiniciar el estado de la búsqueda.",
    resolucion: "Se implementó un estado combinado con `useMemo` / `useState` que filtra por coincidencia de texto y estilo de birra simultáneamente."
  },
  {
    id: 6,
    fecha: "2026-10-05",
    titulo: "Consumo de API pública (Open Brewery DB) y estados asíncronos",
    categoria: "api",
    decision: "Conectar la aplicación a la API pública de cervecerías 'Open Brewery DB' para buscar cervecerías artesanales reales en tiempo real.",
    dificultad: "Controlar adecuadamente el ciclo de vida asíncrono con `useEffect`, evitando memory leaks y manejando errores de red.",
    resolucion: "Se implementó un hook con estados explícitos de `loading`, `error` y `data`, con botón para forzar reintento de conexión."
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
    resolucion: "Se calibró el ancho a 290px, se ajustaron espaciados verticales para alojar los 5 integrantes sin desbordes, se estilizó un scrollbar ultra-fino de 4px en tonos ámbar, y se creó la clase .home-hero-marquee para dialogar armónicamente con la barra lateral."
  }
];
