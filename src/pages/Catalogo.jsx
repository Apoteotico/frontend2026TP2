import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import catalogoData from '../data/catalogo.json';
import CardMaridaje from '../components/CardMaridaje';
import DetalleModal from '../components/DetalleModal';

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalItem, setModalItem] = useState(null);

  // Sincroniza el estado de búsqueda y filtros con la query string de la URL
  const busqueda = searchParams.get('q') || '';
  const filtroIntegrante = searchParams.get('integrante') || 'todos';
  const filtroTipoBirra = searchParams.get('birra') || 'todos';
  const filtroDificultad = searchParams.get('dificultad') || 'todas';

  const integrantesUnicos = useMemo(() => {
    const nombres = new Set(catalogoData.map(item => item.integrante));
    return ['todos', ...Array.from(nombres)];
  }, []);

  const tiposBirra = useMemo(() => {
    const tipos = new Set(catalogoData.map(item => item.tipoBirra));
    return ['todos', ...Array.from(tipos)];
  }, []);

  // Actualiza los parámetros de URL omitiendo valores por defecto para mantener enlaces limpios
  const actualizarParams = (nuevosValores) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(nuevosValores).forEach(([clave, valor]) => {
      if (!valor || valor === 'todos' || valor === 'todas') {
        params.delete(clave);
      } else {
        params.set(clave, valor);
      }
    });
    setSearchParams(params, { replace: true });
  };

  const handleBusqueda = (e) => {
    actualizarParams({ q: e.target.value });
  };

  const handleIntegrante = (e) => {
    actualizarParams({ integrante: e.target.value });
  };

  const handleTipoBirra = (e) => {
    actualizarParams({ birra: e.target.value });
  };

  const handleDificultad = (e) => {
    actualizarParams({ dificultad: e.target.value });
  };

  const restablecerFiltros = () => {
    setSearchParams({}, { replace: true });
  };

  const itemsFiltrados = useMemo(() => {
    return catalogoData.filter((item) => {
      const q = busqueda.toLowerCase();
      const matchTexto =
        item.titulo.toLowerCase().includes(q) ||
        item.integrante.toLowerCase().includes(q) ||
        item.pelicula.toLowerCase().includes(q) ||
        item.director.toLowerCase().includes(q) ||
        item.disco.toLowerCase().includes(q) ||
        item.pizza.toLowerCase().includes(q) ||
        item.birra.toLowerCase().includes(q) ||
        item.proyectoCodigo.toLowerCase().includes(q);

      const matchIntegrante =
        filtroIntegrante === 'todos' || item.integrante.toLowerCase() === filtroIntegrante.toLowerCase();

      const matchBirra =
        filtroTipoBirra === 'todos' || item.tipoBirra.toLowerCase() === filtroTipoBirra.toLowerCase();

      const matchDificultad =
        filtroDificultad === 'todas' || item.dificultad.toLowerCase() === filtroDificultad.toLowerCase();

      return matchTexto && matchIntegrante && matchBirra && matchDificultad;
    });
  }, [busqueda, filtroIntegrante, filtroTipoBirra, filtroDificultad]);

  const hayFiltrosActivos =
    Boolean(busqueda) ||
    filtroIntegrante !== 'todos' ||
    filtroTipoBirra !== 'todos' ||
    filtroDificultad !== 'todas';

  return (
    <div className="catalogo-page">
      <div style={{ marginBottom: '2.5rem' }}>
        <span style={{
          fontFamily: 'var(--fuente-codigo)',
          fontSize: '0.8rem',
          color: 'var(--tomate)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Datos Locales JSON · 20 Funciones del Equipo · TP1 + TP2
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', margin: '0.2rem 0 0.8rem' }}>
          Cartelera de Maridajes del Equipo
        </h1>
        <p style={{ color: 'var(--suave)', fontSize: '1.05rem', maxWidth: '780px' }}>
          Catálogo armado exclusivamente con las <strong>15 películas</strong> y los <strong>15 discos</strong> de
          los cinco integrantes del grupo, combinados con las <strong>5 pizzas</strong>, las <strong>5 birras</strong> y
          los <strong>proyectos de código</strong> que definimos en el TP1.
        </p>
      </div>

      <section style={{
        background: 'var(--papel)',
        border: '1px solid var(--linea)',
        borderRadius: 'var(--radio)',
        padding: '1.5rem',
        boxShadow: 'var(--sombra)',
        marginBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          alignItems: 'end'
        }}>
          <div>
            <label htmlFor="input-busqueda" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--tinta-2)' }}>
              🔍 Buscar película, disco, pizza o integrante:
            </label>
            <input
              id="input-busqueda"
              type="text"
              value={busqueda}
              onChange={handleBusqueda}
              placeholder="Ej: Pulp Fiction, Abbey Road, Fugazzeta..."
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: 'var(--radio-sm)',
                border: '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label htmlFor="filtro-integrante" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--tinta-2)' }}>
              🎬 Integrante del Equipo:
            </label>
            <select
              id="filtro-integrante"
              value={filtroIntegrante}
              onChange={handleIntegrante}
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: 'var(--radio-sm)',
                border: '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.95rem'
              }}
            >
              {integrantesUnicos.map((nombre) => (
                <option key={nombre} value={nombre}>
                  {nombre === 'todos' ? 'Todos los integrantes (5)' : nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filtro-birra" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--tinta-2)' }}>
              🍺 Birra de la Casa (TP1):
            </label>
            <select
              id="filtro-birra"
              value={filtroTipoBirra}
              onChange={handleTipoBirra}
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: 'var(--radio-sm)',
                border: '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.95rem'
              }}
            >
              {tiposBirra.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo === 'todos' ? 'Todas las birras' : tipo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filtro-dificultad" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--tinta-2)' }}>
              💻 Nivel del Proyecto:
            </label>
            <select
              id="filtro-dificultad"
              value={filtroDificultad}
              onChange={handleDificultad}
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: 'var(--radio-sm)',
                border: '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.95rem'
              }}
            >
              <option value="todas">Todos los niveles</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          borderTop: '1px solid var(--linea)',
          paddingTop: '0.85rem'
        }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--suave)' }}>
            Mostrando <strong>{itemsFiltrados.length}</strong> de <strong>{catalogoData.length}</strong> registros del equipo
            {hayFiltrosActivos && (
              <span style={{ marginLeft: '0.5rem', fontFamily: 'var(--fuente-codigo)', fontSize: '0.8rem', color: 'var(--codigo)' }}>
                (Filtros activos en URL)
              </span>
            )}
          </span>

          {hayFiltrosActivos && (
            <button
              type="button"
              onClick={restablecerFiltros}
              className="btn btn-ghost btn-sm"
              style={{ color: 'var(--tomate)', borderColor: 'var(--tomate)' }}
            >
              ↺ Restablecer filtros
            </button>
          )}
        </div>
      </section>

      {itemsFiltrados.length > 0 ? (
        <div className="catalogo-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {itemsFiltrados.map((item) => (
            <CardMaridaje
              key={item.id}
              item={item}
              onVerDetalle={setModalItem}
            />
          ))}
        </div>
      ) : (
        <div style={{
          background: 'var(--papel)',
          border: '2px dashed var(--linea)',
          borderRadius: 'var(--radio)',
          padding: '3.5rem 1.5rem',
          textAlign: 'center',
          color: 'var(--suave)'
        }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🍕🚫</p>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--tinta)', marginBottom: '0.5rem' }}>
            No se encontraron maridajes para esa búsqueda
          </h3>
          <p style={{ maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
            Probá con otros términos (como "Nolan", "Stout", "Muzzarella") o limpiá los filtros seleccionados.
          </p>
          <button type="button" className="btn btn-birra" onClick={restablecerFiltros}>
            Restablecer lista completa
          </button>
        </div>
      )}

      <DetalleModal
        item={modalItem}
        onClose={() => setModalItem(null)}
      />
    </div>
  );
}
