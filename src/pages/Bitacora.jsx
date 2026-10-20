import React, { useState, useMemo } from 'react';
import { bitacoraEntries } from '../data/bitacora';

export default function Bitacora() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [busquedaTexto, setBusquedaTexto] = useState('');
  const [entriesAbiertas, setEntriesAbiertas] = useState(new Set([7, 6, 5, 4]));

  const categorias = useMemo(() => {
    const cats = new Set(bitacoraEntries.map(e => e.categoria));
    return ['todas', ...Array.from(cats)];
  }, []);

  const entradasFiltradas = useMemo(() => {
    return bitacoraEntries.filter((e) => {
      const matchCat = categoriaSeleccionada === 'todas' || e.categoria === categoriaSeleccionada;
      const matchTexto =
        e.titulo.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
        e.decision.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
        e.dificultad.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
        e.resolucion.toLowerCase().includes(busquedaTexto.toLowerCase());
      return matchCat && matchTexto;
    });
  }, [categoriaSeleccionada, busquedaTexto]);

  const toggleEntry = (id) => {
    setEntriesAbiertas(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandirTodas = () => {
    setEntriesAbiertas(new Set(bitacoraEntries.map(e => e.id)));
  };

  const contraerTodas = () => {
    setEntriesAbiertas(new Set());
  };

  return (
    <div className="bitacora-page">
      <div style={{ marginBottom: '2.5rem' }}>
        <span style={{
          fontFamily: 'var(--fuente-codigo)',
          fontSize: '0.8rem',
          color: 'var(--tomate)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Historial del Proyecto
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', margin: '0.2rem 0 0.8rem' }}>
          Bitácora de Rodaje del Equipo
        </h1>
        <p style={{ color: 'var(--suave)', fontSize: '1.05rem', maxWidth: '780px' }}>
          Registro cronológico de las decisiones técnicas, dificultades encontradas
          y soluciones implementadas durante el desarrollo del proyecto.
        </p>
      </div>

      {/* CONTROLES Y FILTROS */}
      <section style={{
        background: 'var(--papel)',
        border: '1px solid var(--linea)',
        borderRadius: 'var(--radio)',
        padding: '1.5rem',
        boxShadow: 'var(--sombra)',
        marginBottom: '2rem',
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
          <div>
            <label htmlFor="busqueda-bitacora" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              🔎 Buscar en decisiones y soluciones:
            </label>
            <input
              id="busqueda-bitacora"
              type="text"
              value={busquedaTexto}
              onChange={(e) => setBusquedaTexto(e.target.value)}
              placeholder="Ej: responsive, sidebar, props, api..."
              style={{
                width: '100%',
                padding: '0.65rem 0.95rem',
                borderRadius: 'var(--radio-sm)',
                border: '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.92rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label htmlFor="categoria-bitacora" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              🏷️ Filtrar por categoría:
            </label>
            <select
              id="categoria-bitacora"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.95rem',
                borderRadius: 'var(--radio-sm)',
                border: '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.92rem',
                outline: 'none',
                textTransform: 'capitalize'
              }}
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'todas' ? 'Todas las categorías' : cat}
                </option>
              ))}
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
          <span style={{ fontSize: '0.88rem', color: 'var(--suave)' }}>
            Mostrando <strong>{entradasFiltradas.length}</strong> de <strong>{bitacoraEntries.length}</strong> registros
          </span>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" className="btn btn-ghost btn-sm" onClick={expandirTodas}>
              Desplegar todos
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={contraerTodas}>
              Contraer todos
            </button>
          </div>
        </div>
      </section>

      {/* LISTA DE ENTRADAS CON ACORDEÓN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {entradasFiltradas.map((entry) => {
          const isOpen = entriesAbiertas.has(entry.id);
          return (
            <article
              key={entry.id}
              className="card"
              style={{
                padding: '1.25rem 1.5rem',
                background: 'var(--papel)',
                borderLeft: '4px solid var(--birra)'
              }}
            >
              <header
                onClick={() => toggleEntry(entry.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
                    <time style={{ fontFamily: 'var(--fuente-codigo)', fontSize: '0.8rem', color: 'var(--suave)' }}>
                      {entry.fecha}
                    </time>
                    <span className="badge badge-codigo" style={{ fontSize: '0.72rem' }}>
                      {entry.categoria}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--tinta)' }}>
                    {entry.titulo}
                  </h3>
                </div>

                <button
                  type="button"
                  style={{
                    background: 'var(--crema)',
                    border: '1px solid var(--linea)',
                    borderRadius: '50%',
                    width: '2rem',
                    height: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    color: 'var(--tinta)',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  aria-expanded={isOpen}
                  aria-label={isOpen ? "Contraer detalle" : "Desplegar detalle"}
                >
                  {isOpen ? "▲" : "▼"}
                </button>
              </header>

              {isOpen && (
                <div style={{
                  marginTop: '1.25rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px dashed var(--linea)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  animation: 'fadeIn 0.2s ease-in'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(90px, auto) 1fr', gap: '0.75rem' }}>
                    <strong style={{ color: 'var(--codigo)', fontSize: '0.9rem', textTransform: 'uppercase', fontFamily: 'var(--fuente-codigo)' }}>
                      Decisión:
                    </strong>
                    <p style={{ fontSize: '0.93rem', color: 'var(--tinta-2)' }}>{entry.decision}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(90px, auto) 1fr', gap: '0.75rem' }}>
                    <strong style={{ color: 'var(--tomate)', fontSize: '0.9rem', textTransform: 'uppercase', fontFamily: 'var(--fuente-codigo)' }}>
                      Dificultad:
                    </strong>
                    <p style={{ fontSize: '0.93rem', color: 'var(--tinta-2)' }}>{entry.dificultad}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(90px, auto) 1fr', gap: '0.75rem' }}>
                    <strong style={{ color: 'var(--albahaca)', fontSize: '0.9rem', textTransform: 'uppercase', fontFamily: 'var(--fuente-codigo)' }}>
                      Resolución:
                    </strong>
                    <p style={{ fontSize: '0.93rem', color: 'var(--tinta-2)' }}>{entry.resolucion}</p>
                  </div>
                </div>
              )}
            </article>
          );
        })}

        {entradasFiltradas.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--suave)', background: 'var(--papel)', borderRadius: 'var(--radio)' }}>
            No se encontraron entradas en la bitácora que coincidan con los filtros.
          </div>
        )}
      </div>
    </div>
  );
}
