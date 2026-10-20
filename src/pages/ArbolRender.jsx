import React, { useState } from 'react';

// Estructura jerárquica real de los componentes de la aplicación
const initialTreeData = {
  id: 'app',
  nombre: '<App />',
  tipo: 'Raíz',
  descripcion: 'Punto de entrada de React con BrowserRouter y definición de las Routes.',
  props: 'Ninguna',
  estado: 'Rutas activas',
  hijos: [
    {
      id: 'layout',
      nombre: '<Layout />',
      tipo: 'Layout Maestro',
      descripcion: 'Envoltorio compartido que aloja la Sidebar, DesktopTopBar y el contenedor del Outlet.',
      props: 'children / Outlet',
      estado: 'isSidebarOpen (boolean), tema (claro|oscuro), location (pathname)',
      hijos: [
        {
          id: 'sidebar',
          nombre: '<Sidebar />',
          tipo: 'Navegación Compartida',
          descripcion: 'Menú lateral fijo/drawer con la identidad del equipo y NavLinks activos.',
          props: 'isOpen (boolean), onClose (función)',
          estado: 'Ninguno (lee integrantes.js)',
          hijos: []
        },
        {
          id: 'mobile-header',
          nombre: '<MobileHeader />',
          tipo: 'Componente UI',
          descripcion: 'Barra superior móvil con logo y botón hamburguesa para pantallas < 900px.',
          props: 'onToggle (función)',
          estado: 'Ninguno',
          hijos: []
        },
        {
          id: 'desktop-topbar',
          nombre: '<DesktopTopBar />',
          tipo: 'Componente UI de Integración',
          descripcion: 'Barra superior fija de escritorio con efecto vidrio (backdrop-filter: blur), breadcrumb de navegación y badges de estado.',
          props: 'currentTitle (string), location (object)',
          estado: 'Derivado de ruta activa',
          hijos: []
        },
        {
          id: 'outlet',
          nombre: '<Outlet /> (React Router)',
          tipo: 'Contenedor Dinámico',
          descripcion: 'Punto de inserción donde React Router renderiza la página correspondiente a la URL.',
          props: 'Manejado por Router',
          estado: 'Ruta actual',
          hijos: [
            {
              id: 'page-home',
              nombre: '<Home /> (Ruta: /)',
              tipo: 'Página',
              descripcion: 'Portada de gala con hero, interactividad y afiches de integrantes.',
              props: 'Ninguna',
              estado: 'nocheSorteada (objeto), animandoSorteo (boolean)',
              hijos: [
                {
                  id: 'home-hero',
                  nombre: '<HeroMarquesina />',
                  tipo: 'Sección UI',
                  descripcion: 'Presentación del equipo, propósito y los 4 pilares.',
                  props: 'Ninguna',
                  estado: 'Ninguno',
                  hijos: []
                },
                {
                  id: 'home-sorteador',
                  nombre: '<SorteadorNoche />',
                  tipo: 'Componente Interactivo',
                  descripcion: 'Sortea un maridaje del catálogo local con animación.',
                  props: 'onSortear, nocheSorteada',
                  estado: 'animando',
                  hijos: []
                },
                {
                  id: 'home-cards',
                  nombre: '<MemberCard /> (x5)',
                  tipo: 'Componente Reutilizable',
                  descripcion: 'Afiche de cada integrante con foto, rol, habilidades y enlace.',
                  props: 'miembro (objeto)',
                  estado: 'hoverScale',
                  hijos: []
                }
              ]
            },
            {
              id: 'page-perfil',
              nombre: '<Perfil /> (Ruta: /perfil/:slug)',
              tipo: 'Página',
              descripcion: 'Vista individual del integrante con cartelera multimedia (pósters con tráiler en modal y discos con reproductor de audio useRef).',
              props: 'slug (extraído con useParams)',
              estado: 'trailerPelicula, playingAlbumIdx, audioRef (useRef), e interacciones por integrante',
              hijos: [
                {
                  id: 'perfil-head',
                  nombre: '<ProfileHead />',
                  tipo: 'Componente UI',
                  descripcion: 'Foto en afiche 4:5 y ficha técnica (ciudad, edad, GitHub, PFO1).',
                  props: 'miembro (objeto)',
                  estado: 'Ninguno',
                  hijos: []
                },
                {
                  id: 'perfil-boards',
                  nombre: '<FavoritosBoard />',
                  tipo: 'Componente Multimedia',
                  descripcion: 'Grilla de 3 películas (con pósters oficiales y botón de tráiler) y 3 discos (con portadas y reproductor de 30s controlado por useRef).',
                  props: 'peliculas, discos, playingAlbumIdx, onOpenTrailer, onToggleAudio',
                  estado: 'isHighlighted / isOpen / isPlaying',
                  hijos: []
                },
                {
                  id: 'perfil-trailer-modal',
                  nombre: '<TrailerModal /> (PropTypes)',
                  tipo: 'Componente Modal de Cine',
                  descripcion: 'Ventana flotante 16:9 que reproduce el tráiler oficial de cada película validada con PropTypes.shape.',
                  props: 'pelicula (PropTypes.shape), onClose (PropTypes.func)',
                  estado: 'Condicional (pelicula !== null) + listener Escape',
                  hijos: []
                },
                {
                  id: 'perfil-interaccion',
                  nombre: '<InteraccionIndividual />',
                  tipo: 'Componente con Estado',
                  descripcion: 'Función interactiva propia: lluvia pizza/birra (Guille), highlight (Flor), acordéon (Sonia), frases (Eitel), donaciones (Esteban).',
                  props: 'slug, onTrigger',
                  estado: 'guilleRondas, emojis, etc.',
                  hijos: []
                },
                {
                  id: 'perfil-pager',
                  nombre: '<PagerNavigation />',
                  tipo: 'Navegación Circular',
                  descripcion: 'Botones Anterior y Siguiente calculados dinámicamente.',
                  props: 'prevMiembro, nextMiembro',
                  estado: 'Ninguno',
                  hijos: []
                }
              ]
            },
            {
              id: 'page-catalogo',
              nombre: '<Catalogo /> (Ruta: /catalogo)',
              tipo: 'Página',
              descripcion: 'Catálogo de 24 datos locales JSON con búsqueda y filtros.',
              props: 'Ninguna',
              estado: 'useSearchParams (q, birra, dificultad), modalItem (objeto|null)',
              hijos: [
                {
                  id: 'catalogo-filtros',
                  nombre: '<FiltrosBar />',
                  tipo: 'Componente de Control',
                  descripcion: 'Input de texto y selectores sincronizados bidireccionalmente con useSearchParams.',
                  props: 'searchParams, setSearchParams',
                  estado: 'Sincronizado con URL',
                  hijos: []
                },
                {
                  id: 'catalogo-cards',
                  nombre: '<CardMaridaje /> (x24 · PropTypes)',
                  tipo: 'Componente Modular Validado',
                  descripcion: 'Tarjetas con película, pizza, birra y reto técnico validadas con PropTypes.shape.',
                  props: 'item (shape 12 campos), onVerDetalle (func)',
                  estado: 'Ninguno (presentacional)',
                  hijos: []
                },
                {
                  id: 'catalogo-modal',
                  nombre: '<DetalleModal /> (PropTypes)',
                  tipo: 'Modal Accesible Validado',
                  descripcion: 'Modal con sinopsis de maridaje y reto validado formalmente con PropTypes.',
                  props: 'item (shape|null), onClose (func)',
                  estado: 'Ninguno (controlado)',
                  hijos: []
                }
              ]
            },
            {
              id: 'page-api',
              nombre: '<ApiConsumo /> (Ruta: /api)',
              tipo: 'Página Asíncrona',
              descripcion: 'Consumo de la API pública Open Brewery DB con useEffect y fetch.',
              props: 'Ninguna',
              estado: 'cervecerias (array), cargando (boolean), error (string|null), ciudad (string)',
              hijos: [
                {
                  id: 'api-controls',
                  nombre: '<ApiControlPanel />',
                  tipo: 'Componente de Control',
                  descripcion: 'Selector de ciudades y botones de refresco / prueba de error.',
                  props: 'ciudad, onSelectCiudad, onReload, onSimulateError',
                  estado: 'Ninguno',
                  hijos: []
                },
                {
                  id: 'api-loading',
                  nombre: '<LoadingSpinner />',
                  tipo: 'Estado Condicional',
                  descripcion: 'Feedback visual mientras la promesa asíncrona está pendiente.',
                  props: 'cargando (boolean)',
                  estado: 'Ninguno',
                  hijos: []
                },
                {
                  id: 'api-error',
                  nombre: '<ErrorAlert />',
                  tipo: 'Estado Condicional',
                  descripcion: 'Cartel de aviso ante fallas de red con botón de reintento.',
                  props: 'error (string), onRetry (función)',
                  estado: 'Ninguno',
                  hijos: []
                },
                {
                  id: 'api-cards',
                  nombre: '<BreweryCard /> (x12)',
                  tipo: 'Componente Reutilizable',
                  descripcion: 'Cervecería artesanal con tipo, ubicación y link oficial.',
                  props: 'brewery (objeto)',
                  estado: 'Ninguno',
                  hijos: []
                }
              ]
            },
            {
              id: 'page-arbol',
              nombre: '<ArbolRender /> (Ruta: /arbol)',
              tipo: 'Página Interactiva',
              descripcion: 'Visualizador del árbol de componentes con recursión y colapso de nodos.',
              props: 'Ninguna',
              estado: 'expandedNodes (Set de IDs)',
              hijos: []
            },
            {
              id: 'page-bitacora',
              nombre: '<Bitacora /> (Ruta: /bitacora)',
              tipo: 'Página',
              descripcion: 'Registro de desarrollo con filtros por categoría y acordeones.',
              props: 'Ninguna',
              estado: 'activeCategoria (string), expandedEntries (Set)',
              hijos: []
            }
          ]
        },
        {
          id: 'footer',
          nombre: '<Footer />',
          tipo: 'Componente UI',
          descripcion: 'Pie de página con marca, mención a React y enlaces rápidos.',
          props: 'Ninguna',
          estado: 'Ninguno',
          hijos: []
        }
      ]
    }
  ]
};

// Componente recursivo para renderizar cada nodo del árbol
function TreeNode({ node, level, expandedNodes, toggleNode }) {
  const isExpanded = expandedNodes.has(node.id);
  const hasChildren = node.hijos && node.hijos.length > 0;

  return (
    <div style={{ marginLeft: level > 0 ? '1.5rem' : 0, marginTop: '0.6rem' }}>
      <div style={{
        background: 'var(--papel)',
        border: '1px solid var(--linea)',
        borderRadius: 'var(--radio-sm)',
        padding: '0.85rem 1.15rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        boxShadow: level === 0 ? 'var(--sombra)' : 'none',
        borderLeft: `4px solid ${
          node.tipo.includes('Raíz') ? 'var(--tomate)' :
          node.tipo.includes('Layout') ? 'var(--birra)' :
          node.tipo.includes('Página') ? 'var(--codigo)' :
          'var(--albahaca)'
        }`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          {hasChildren && (
            <button
              type="button"
              onClick={() => toggleNode(node.id)}
              style={{
                background: 'var(--crema)',
                border: '1px solid var(--linea)',
                borderRadius: '0.3rem',
                width: '1.7rem',
                height: '1.7rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--tinta)'
              }}
              aria-label={isExpanded ? `Contraer nodo ${node.nombre}` : `Expandir nodo ${node.nombre}`}
            >
              {isExpanded ? '−' : '+'}
            </button>
          )}

          <span style={{
            fontFamily: 'var(--fuente-codigo)',
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'var(--tinta)'
          }}>
            {node.nombre}
          </span>

          <span className="badge badge-codigo" style={{ fontSize: '0.72rem' }}>
            {node.tipo}
          </span>
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--suave)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span><strong>Props:</strong> {node.props}</span>
          <span><strong>Estado:</strong> {node.estado}</span>
        </div>

        <p style={{ width: '100%', fontSize: '0.85rem', color: 'var(--suave)', marginTop: '0.2rem' }}>
          {node.descripcion}
        </p>
      </div>

      {/* Renderizado recursivo de hijos si está expandido */}
      {hasChildren && isExpanded && (
        <div style={{ borderLeft: '2px dashed rgba(232, 167, 43, 0.4)', marginLeft: '0.85rem', paddingLeft: '0.5rem' }}>
          {node.hijos.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Función auxiliar para recolectar todos los IDs
function getAllIds(node) {
  let ids = [node.id];
  if (node.hijos) {
    node.hijos.forEach(h => {
      ids = ids.concat(getAllIds(h));
    });
  }
  return ids;
}

export default function ArbolRender() {
  // Inicialmente expandimos los 3 primeros niveles
  const [expandedNodes, setExpandedNodes] = useState(
    new Set(['app', 'layout', 'outlet', 'page-home', 'page-perfil', 'page-catalogo', 'page-api'])
  );

  const toggleNode = (id) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedNodes(new Set(getAllIds(initialTreeData)));
  };

  const collapseAll = () => {
    setExpandedNodes(new Set(['app']));
  };

  return (
    <div className="arbol-page">
      <div style={{ marginBottom: '2.5rem' }}>
        <span style={{
          fontFamily: 'var(--fuente-codigo)',
          fontSize: '0.8rem',
          color: 'var(--tomate)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Arquitectura de Componentes · React
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', margin: '0.2rem 0 0.8rem' }}>
          Árbol de Renderizado de la Aplicación
        </h1>
        <p style={{ color: 'var(--suave)', fontSize: '1.05rem', maxWidth: '780px' }}>
          Representación interactiva de la jerarquía real de componentes en React.
          Muestra cómo fluyen las <strong>props</strong> y dónde reside el <strong>estado</strong> manteniendo
          una arquitectura modular de baja profundidad (máximo 3 a 4 niveles).
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'var(--crema)',
        border: '1px solid var(--linea)',
        borderRadius: 'var(--radio)',
        padding: '1rem 1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Controles del Árbol:</span>
          <button type="button" className="btn btn-sm btn-birra" onClick={expandAll}>
            ➕ Expandir todo
          </button>
          <button type="button" className="btn btn-sm btn-ghost" onClick={collapseAll}>
            ➖ Contraer todo
          </button>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--suave)', display: 'flex', gap: '0.8rem' }}>
          <span>🔴 Raíz</span>
          <span>🟡 Layout</span>
          <span>🔵 Página</span>
          <span>🟢 Componente</span>
        </div>
      </div>

      {/* RENDERIZADO DEL ÁRBOL */}
      <div style={{
        background: 'var(--crema)',
        border: '1px solid var(--linea)',
        borderRadius: 'var(--radio)',
        padding: '1.5rem',
        boxShadow: 'var(--sombra)'
      }}>
        <TreeNode
          node={initialTreeData}
          level={0}
          expandedNodes={expandedNodes}
          toggleNode={toggleNode}
        />
      </div>
    </div>
  );
}
