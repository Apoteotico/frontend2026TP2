import React, { useState, useEffect, useCallback } from 'react';

const CIUDADES_DISPONIBLES = [
  { id: 'san_diego', nombre: 'San Diego (California)' },
  { id: 'portland', nombre: 'Portland (Oregon)' },
  { id: 'denver', nombre: 'Denver (Colorado)' },
  { id: 'austin', nombre: 'Austin (Texas)' },
  { id: 'chicago', nombre: 'Chicago (Illinois)' }
];

export default function ApiConsumo() {
  const [cervecerias, setCervecerias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('san_diego');
  const [recargaManual, setRecargaManual] = useState(0);

  const fetchBreweries = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const url = `https://api.openbrewerydb.org/v1/breweries?by_city=${ciudadSeleccionada}&per_page=12`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error en el servidor: HTTP ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setCervecerias(data);
    } catch (err) {
      setError(err.message || 'Error desconocido al intentar conectar con la API pública.');
    } finally {
      setCargando(false);
    }
  }, [ciudadSeleccionada, recargaManual]);

  useEffect(() => {
    fetchBreweries();
  }, [fetchBreweries]);

  // Permite simular una caída de red para verificar la interfaz de contingencia y reintento
  const forzarErrorPrueba = () => {
    setCargando(true);
    setTimeout(() => {
      setError("Error simulado de red (HTTP 503 Service Unavailable) para verificar el estado de error y la recuperación.");
      setCargando(false);
    }, 400);
  };

  return (
    <div className="api-page">
      <div style={{ marginBottom: '2.5rem' }}>
        <span style={{
          fontFamily: 'var(--fuente-codigo)',
          fontSize: '0.8rem',
          color: 'var(--tomate)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          API Pública Externa · REST JSON
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', margin: '0.2rem 0 0.8rem' }}>
          Conexión en Vivo: Open Brewery DB
        </h1>
        <div style={{
          background: 'var(--crema)',
          border: '1px solid var(--linea)',
          borderRadius: 'var(--radio)',
          padding: '1.25rem 1.5rem',
          maxWidth: '850px',
          boxShadow: 'var(--sombra)'
        }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--tinta-2)', lineHeight: 1.5 }}>
            <strong>¿Qué información aporta esta API?</strong> Consume la base de datos abierta{' '}
            <a href="https://www.openbrewerydb.org/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
              Open Brewery DB
            </a>
            , una API pública gratuita sin necesidad de credenciales privadas. Consulta cervecerías artesanales
            reales, sus estilos (microcervecerías, brewpubs, regionales), direcciones y sitios web en vivo.
          </p>
        </div>
      </div>

      {/* PANEL DE CONTROL DE LA API */}
      <div style={{
        background: 'var(--papel)',
        border: '1px solid var(--linea)',
        borderRadius: 'var(--radio)',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: 'var(--sombra)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <label htmlFor="select-ciudad" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--tinta-2)' }}>
            📍 Polo Cervecero:
          </label>
          <select
            id="select-ciudad"
            value={ciudadSeleccionada}
            onChange={(e) => setCiudadSeleccionada(e.target.value)}
            disabled={cargando}
            style={{
              padding: '0.6rem 0.9rem',
              borderRadius: 'var(--radio-sm)',
              border: '1px solid var(--linea)',
              background: 'var(--crema)',
              fontFamily: 'var(--fuente-texto)',
              fontSize: '0.9rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {CIUDADES_DISPONIBLES.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-birra btn-sm"
            onClick={() => setRecargaManual(prev => prev + 1)}
            disabled={cargando}
          >
            {cargando ? 'Consultando...' : '🔄 Actualizar / Refrescar'}
          </button>

          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={forzarErrorPrueba}
            disabled={cargando}
            title="Simular fallo de red para comprobar el renderizado del estado de error"
          >
            ⚠️ Simular Error
          </button>
        </div>
      </div>

      {cargando && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          background: 'var(--papel)',
          border: '1px solid var(--linea)',
          borderRadius: 'var(--radio)',
          boxShadow: 'var(--sombra)'
        }}>
          <div style={{
            fontSize: '3rem',
            animation: 'spin 1.2s infinite linear',
            display: 'inline-block',
            marginBottom: '1rem'
          }}>
            🍺
          </div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--tinta)', marginBottom: '0.35rem' }}>
            Sirviendo datos desde Open Brewery DB...
          </h3>
          <p style={{ color: 'var(--suave)', fontSize: '0.95rem' }}>
            Cargando catálogo en tiempo real para <strong>{CIUDADES_DISPONIBLES.find(c => c.id === ciudadSeleccionada)?.nombre}</strong>.
          </p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {!cargando && error && (
        <div style={{
          background: '#fef2f2',
          border: '2px solid #ef4444',
          borderRadius: 'var(--radio)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          color: '#991b1b',
          boxShadow: 'var(--sombra)'
        }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>❌⚠️</p>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Ocurrió un error en la consulta</h3>
          <p style={{ maxWidth: '580px', margin: '0 auto 1.5rem', fontSize: '0.95rem', color: '#7f1d1d' }}>
            {error}
          </p>
          <button
            type="button"
            className="btn"
            onClick={fetchBreweries}
            style={{ background: '#b91c1c' }}
          >
            🔁 Reintentar consulta a la API
          </button>
        </div>
      )}

      {!cargando && !error && (
        <>
          <p style={{ fontSize: '0.9rem', color: 'var(--suave)', marginBottom: '1rem' }}>
            Se cargaron <strong>{cervecerias.length}</strong> cervecerías artesanales activas:
          </p>

          <div className="breweries-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {cervecerias.map((brewery) => (
              <article
                key={brewery.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.5rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-birra" style={{ textTransform: 'capitalize' }}>
                      {brewery.brewery_type || 'Artisanal'}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--suave)', fontFamily: 'var(--fuente-codigo)' }}>
                      {brewery.country}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: 'var(--tinta)', marginBottom: '0.4rem' }}>
                    {brewery.name}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--suave)', marginBottom: '0.75rem' }}>
                    📍 {brewery.street ? `${brewery.street}, ` : ''}{brewery.city}, {brewery.state_province}
                  </p>
                </div>

                <div style={{
                  borderTop: '1px dashed var(--linea)',
                  paddingTop: '0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  {brewery.website_url ? (
                    <a
                      href={brewery.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-ghost"
                      style={{ color: 'var(--codigo)', borderColor: 'var(--codigo)' }}
                    >
                      Sitio oficial ↗
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--suave)', fontStyle: 'italic' }}>
                      Sin web registrada
                    </span>
                  )}

                  {brewery.phone && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--suave)', fontFamily: 'var(--fuente-codigo)' }}>
                      📞 {brewery.phone}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
