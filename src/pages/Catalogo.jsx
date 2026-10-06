import React, { useState, useMemo } from 'react';
import catalogoData from '../data/catalogo.json';

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipoBirra, setFiltroTipoBirra] = useState('todos');
  const [filtroDificultad, setFiltroDificultad] = useState('todas');
  const [modalItem, setModalItem] = useState(null);

  // Obtener estilos únicos de birra para el selector
  const tiposBirra = useMemo(() => {
    const tipos = new Set(catalogoData.map(item => item.tipoBirra));
    return ['todos', ...Array.from(tipos)];
  }, []);

  // Filtrado reactivo en tiempo real
  const itemsFiltrados = useMemo(() => {
    return catalogoData.filter((item) => {
      const matchTexto =
        item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.pelicula.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.director.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.pizza.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.birra.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.proyectoCodigo.toLowerCase().includes(busqueda.toLowerCase());

      const matchBirra =
        filtroTipoBirra === 'todos' || item.tipoBirra.toLowerCase() === filtroTipoBirra.toLowerCase();

      const matchDificultad =
        filtroDificultad === 'todas' || item.dificultad.toLowerCase() === filtroDificultad.toLowerCase();

      return matchTexto && matchBirra && matchDificultad;
    });
  }, [busqueda, filtroTipoBirra, filtroDificultad]);

  const restablecerFiltros = () => {
    setBusqueda('');
    setFiltroTipoBirra('todos');
    setFiltroDificultad('todas');
  };

  return (
    <div className="catalogo-page">
      {/* CABECERA */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span style={{
          fontFamily: 'var(--fuente-codigo)',
          fontSize: '0.8rem',
          color: 'var(--tomate)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Datos Locales JSON · 24 Registros
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', margin: '0.2rem 0 0.8rem' }}>
          Cartelera de Maridajes y Proyectos
        </h1>
        <p style={{ color: 'var(--suave)', fontSize: '1.05rem', maxWidth: '750px' }}>
          Catálogo local estructurado en JSON con 24 maridajes de cine de culto, pizzas artesanales,
          estilos de birra y desafíos de programación para acompañar la semana.
        </p>
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          alignItems: 'end'
        }}>
          {/* Input de búsqueda */}
          <div>
            <label htmlFor="input-busqueda" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--tinta-2)' }}>
              🔍 Buscar por título, película, pizza o reto:
            </label>
            <input
              id="input-busqueda"
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Ej: Tarantino, Fugazzeta, IPA, Canvas..."
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: 'var(--radio-sm)',
                border: '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.95rem',
                outline: 'none',
                color: 'var(--texto)'
              }}
            />
          </div>

          {/* Filtro por Estilo de Birra */}
          <div>
            <label htmlFor="select-birra" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--tinta-2)' }}>
              🍺 Estilo de Cerveza:
            </label>
            <select
              id="select-birra"
              value={filtroTipoBirra}
              onChange={(e) => setFiltroTipoBirra(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: 'var(--radio-sm)',
                border: '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.95rem',
                outline: 'none',
                color: 'var(--texto)'
              }}
            >
              {tiposBirra.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo === 'todos' ? 'Todos los estilos' : tipo}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Dificultad de Código */}
          <div>
            <label htmlFor="select-dificultad" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--tinta-2)' }}>
              💻 Dificultad del Proyecto:
            </label>
            <select
              id="select-dificultad"
              value={filtroDificultad}
              onChange={(e) => setFiltroDificultad(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: 'var(--radio-sm)',
                border: '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.95rem',
                outline: 'none',
                color: 'var(--texto)'
              }}
            >
              <option value="todas">Todas las dificultades</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
        </div>

        {/* Resumen de resultados y reset */}
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
            Mostrando <strong>{itemsFiltrados.length}</strong> de <strong>{catalogoData.length}</strong> registros
          </span>

          {(busqueda || filtroTipoBirra !== 'todos' || filtroDificultad !== 'todas') && (
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

      {/* GRILLA DE TARJETAS */}
      {itemsFiltrados.length > 0 ? (
        <div className="catalogo-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {itemsFiltrados.map((item) => (
            <article
              key={item.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                background: 'var(--papel)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-codigo">{item.genero}</span>
                  <span className="badge badge-birra">{item.tipoBirra}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--tinta)', marginBottom: '0.4rem' }}>
                  {item.titulo}
                </h3>

                <div style={{ fontSize: '0.9rem', color: 'var(--suave)', marginBottom: '1rem' }}>
                  🎬 <strong>{item.pelicula}</strong> ({item.anio}) · {item.director}
                </div>

                <div style={{
                  background: 'var(--crema)',
                  borderRadius: 'var(--radio-sm)',
                  padding: '0.85rem',
                  fontSize: '0.88rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  marginBottom: '1rem'
                }}>
                  <p>🍕 <strong style={{ color: 'var(--tinta)' }}>Pizza:</strong> {item.pizza}</p>
                  <p>🍺 <strong style={{ color: 'var(--tinta)' }}>Birra:</strong> {item.birra}</p>
                </div>
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.75rem',
                  borderTop: '1px dashed var(--linea)'
                }}>
                  <span className="badge badge-albahaca">{item.dificultad}</span>
                  <button
                    type="button"
                    className="btn btn-birra btn-sm"
                    onClick={() => setModalItem(item)}
                  >
                    Ver maridaje completo 🔍
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* MENSAJE CUANDO NO HAY RESULTADOS */
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

      {/* MODAL DETALLADO CON INFORMACIÓN ADICIONAL */}
      {modalItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titulo"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(18, 16, 14, 0.75)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            zIndex: 1000
          }}
          onClick={() => setModalItem(null)}
        >
          <div
            style={{
              background: 'var(--papel)',
              borderRadius: 'var(--radio)',
              maxWidth: '620px',
              width: '100%',
              padding: '2rem',
              boxShadow: 'var(--sombra-alta)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalItem(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.4rem',
                color: 'var(--suave)',
                cursor: 'pointer'
              }}
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <span className="badge badge-tomate" style={{ marginBottom: '0.5rem' }}>
              {modalItem.genero} · {modalItem.tipoBirra}
            </span>
            <h2 id="modal-titulo" style={{ fontSize: '1.65rem', marginBottom: '0.3rem' }}>
              {modalItem.titulo}
            </h2>
            <p style={{ color: 'var(--suave)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              Película: <strong>{modalItem.pelicula}</strong> ({modalItem.anio}) · Dirección: {modalItem.director}
            </p>

            <div style={{
              background: 'var(--crema)',
              border: '1px solid var(--linea)',
              borderRadius: 'var(--radio-sm)',
              padding: '1.25rem',
              marginBottom: '1.25rem'
            }}>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--tomate-oscuro)', marginBottom: '0.4rem', fontFamily: 'var(--fuente-codigo)' }}>
                📖 Sinopsis del Maridaje:
              </h4>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--tinta-2)', lineHeight: 1.5 }}>
                "{modalItem.sinopsisMaridaje}"
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--suave)', textTransform: 'uppercase', fontFamily: 'var(--fuente-codigo)' }}>🍕 Receta Pizza</span>
                <p style={{ fontWeight: 600, color: 'var(--tinta)', marginTop: '0.2rem' }}>{modalItem.pizza}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--suave)', textTransform: 'uppercase', fontFamily: 'var(--fuente-codigo)' }}>🍺 Cerveza sugerida</span>
                <p style={{ fontWeight: 600, color: 'var(--tinta)', marginTop: '0.2rem' }}>{modalItem.birra}</p>
              </div>
            </div>

            <div style={{
              borderTop: '1px solid var(--linea)',
              paddingTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--codigo)', fontFamily: 'var(--fuente-codigo)' }}>💻 DESAFÍO TÉCNICO:</span>
                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{modalItem.proyectoCodigo}</p>
              </div>
              <span className="badge badge-albahaca">{modalItem.dificultad} · {modalItem.tiempoEstimado}</span>
            </div>

            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setModalItem(null)}
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              Cerrar detalle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
