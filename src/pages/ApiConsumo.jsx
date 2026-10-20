import React, { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Colecciones conectadas exactamente con los 3 discos favoritos y las películas
 * que cada integrante definió en su perfil (integrantes.js).
 */
const COLECCIONES_EQUIPO = [
  {
    id: 'soundtracks',
    etiqueta: '🎬 Bandas Sonoras de Películas del Equipo (Pulp Fiction · Interstellar · Inception · El Padrino · Whiplash)',
    descripcion: 'Bandas sonoras originales de las películas favoritas del grupo',
    fuentes: [
      { tipo: 'lookup', id: 1469583186, max: 3, nota: 'Película: Pulp Fiction (Guillermo)' },
      { tipo: 'lookup', id: 1533983552, max: 2, nota: 'Película: Interstellar (Sonia)' },
      { tipo: 'lookup', id: 380349905, max: 2, nota: 'Película: Inception (Florencia)' },
      { tipo: 'lookup', id: 1440844661, max: 2, nota: 'Película: El Padrino (Esteban)' },
      { tipo: 'lookup', id: 1571408218, max: 2, nota: 'Película: Whiplash (Sonia)' },
      { tipo: 'lookup', id: 1291056782, max: 1, nota: 'Película: Blade Runner 2049 (Eitel)' }
    ]
  },
  {
    id: 'guillermo',
    etiqueta: '⚡ Discos de Guillermo Chacon (The Doors in Concert · Rolling Stones Circus · Abbey Road)',
    descripcion: 'The Doors in Concert (1970) · The Rolling Stones Rock and Roll Circus (1968) · Abbey Road (1969)',
    fuentes: [
      { tipo: 'lookup', id: 213622982, max: 4, nota: 'Disco 1 de Guillermo: The Doors in Concert' },
      { tipo: 'search', term: 'The Rolling Stones Sympathy for the Devil Jumpin Jack Flash You Cant Always Get What You Want', max: 4, artistFilter: 'Rolling Stones', nota: 'Disco 2 de Guillermo: Rock and Roll Circus' },
      { tipo: 'lookup', id: 1474833332, max: 4, nota: 'Disco 3 de Guillermo: Abbey Road (The Beatles)' }
    ]
  },
  {
    id: 'florencia',
    etiqueta: '🎸 Discos de Florencia Guzmán (Currents · Bocanada · Rumours)',
    descripcion: 'Currents (Tame Impala, 2015) · Bocanada (Gustavo Cerati, 1999) · Rumours (Fleetwood Mac, 1977)',
    fuentes: [
      { tipo: 'lookup', id: 1440838039, max: 4, nota: 'Disco 1 de Florencia: Currents (Tame Impala)' },
      { tipo: 'lookup', id: 304792998, max: 4, nota: 'Disco 2 de Florencia: Bocanada (Gustavo Cerati)' },
      { tipo: 'lookup', id: 651871544, max: 4, nota: 'Disco 3 de Florencia: Rumours (Fleetwood Mac)' }
    ]
  },
  {
    id: 'sonia',
    etiqueta: '🎹 Discos de Sonia Andrada (The Dark Side of the Moon · Artaud · Random Access Memories)',
    descripcion: 'The Dark Side of the Moon (Pink Floyd, 1973) · Artaud (Pescado Rabioso, 1973) · Random Access Memories (Daft Punk, 2013)',
    fuentes: [
      { tipo: 'lookup', id: 1665303755, max: 4, nota: 'Disco 1 de Sonia: The Dark Side of the Moon (Pink Floyd)' },
      { tipo: 'lookup', id: 321645242, max: 4, nota: 'Disco 2 de Sonia: Artaud (Pescado Rabioso)' },
      { tipo: 'lookup', id: 1673536063, max: 4, nota: 'Disco 3 de Sonia: Random Access Memories (Daft Punk)' }
    ]
  },
  {
    id: 'eitel',
    etiqueta: '🤘 Discos de Eitel Belinzoni (Ok Computer · Canción Animal · Ten)',
    descripcion: 'Ok Computer (Radiohead, 1997) · Canción Animal (Soda Stereo, 1990) · Ten (Pearl Jam, 1991)',
    fuentes: [
      { tipo: 'lookup', id: 1097861387, max: 4, nota: 'Disco 1 de Eitel: Ok Computer (Radiohead)' },
      { tipo: 'lookup', id: 321882757, max: 4, nota: 'Disco 2 de Eitel: Canción Animal (Soda Stereo)' },
      { tipo: 'lookup', id: 425465247, max: 4, nota: 'Disco 3 de Eitel: Ten (Pearl Jam)' }
    ]
  },
  {
    id: 'esteban',
    etiqueta: '🎷 Discos de Esteban Acosta (Abbey Road · Clics Modernos · Led Zeppelin IV)',
    descripcion: 'Abbey Road (The Beatles, 1969) · Clics Modernos (Charly García, 1983) · Led Zeppelin IV (1971)',
    fuentes: [
      { tipo: 'lookup', id: 1474833332, max: 4, nota: 'Disco 1 de Esteban: Abbey Road (The Beatles)' },
      { tipo: 'search', term: 'Charly Garcia Nos Siguen Pegando Abajo Los Dinosaurios', max: 4, artistFilter: 'Charly', nota: 'Disco 2 de Esteban: Clics Modernos (Charly García)' },
      { tipo: 'lookup', id: 580708175, max: 4, nota: 'Disco 3 de Esteban: Led Zeppelin IV' }
    ]
  }
];

/**
 * Mapa de películas conocidas para resolver directamente su álbum oficial de Soundtrack en iTunes
 * cuando el usuario escribe el nombre de una película en el buscador.
 */
const PELICULAS_CONOCIDAS = {
  'pulp fiction': { tipo: 'lookup', id: 1469583186, nombre: 'Pulp Fiction (Original Motion Picture Soundtrack)' },
  'reservoir dogs': { tipo: 'lookup', id: 1440847276, nombre: 'Reservoir Dogs (Original Motion Picture Soundtrack)' },
  'perros de la calle': { tipo: 'lookup', id: 1440847276, nombre: 'Reservoir Dogs (Original Motion Picture Soundtrack)' },
  'kill bill': {
    tipo: 'queries',
    nombre: 'Kill Bill Vol. 1 & 2 (Soundtrack)',
    terms: [
      'Tomoyasu Hotei Battle Without Honor Or Humanity',
      'Nancy Sinatra Bang Bang My Baby Shot Me Down',
      'Santa Esmeralda Dont Let Me Be Misunderstood',
      'Gheorghe Zamfir The Lonely Shepherd'
    ]
  },
  'interstellar': { tipo: 'lookup', id: 1533983552, nombre: 'Interstellar (Original Motion Picture Soundtrack)' },
  'interestelar': { tipo: 'lookup', id: 1533983552, nombre: 'Interstellar (Original Motion Picture Soundtrack)' },
  'inception': { tipo: 'lookup', id: 380349905, nombre: 'Inception (Music from the Motion Picture)' },
  'el origen': { tipo: 'lookup', id: 380349905, nombre: 'Inception (Music from the Motion Picture)' },
  'whiplash': { tipo: 'lookup', id: 1571408218, nombre: 'Whiplash (Original Motion Picture Soundtrack)' },
  'cinema paradiso': { tipo: 'lookup', id: 830673047, nombre: 'Cinema Paradiso (Original Motion Picture Soundtrack)' },
  'blade runner': { tipo: 'lookup', id: 1291056782, nombre: 'Blade Runner 2049 (Original Motion Picture Soundtrack)' },
  'blade runner 2049': { tipo: 'lookup', id: 1291056782, nombre: 'Blade Runner 2049 (Original Motion Picture Soundtrack)' },
  'matrix': { tipo: 'lookup', id: 1443853659, nombre: 'The Matrix (Original Motion Picture Score)' },
  'the matrix': { tipo: 'lookup', id: 1443853659, nombre: 'The Matrix (Original Motion Picture Score)' },
  'el padrino': { tipo: 'lookup', id: 1440844661, nombre: 'The Godfather (Soundtrack from the Motion Picture)' },
  'the godfather': { tipo: 'lookup', id: 1440844661, nombre: 'The Godfather (Soundtrack from the Motion Picture)' },
  'padrino': { tipo: 'lookup', id: 1440844661, nombre: 'The Godfather (Soundtrack from the Motion Picture)' },
  'el gran hotel budapest': { tipo: 'lookup', id: 1440789547, nombre: 'The Grand Budapest Hotel (Original Soundtrack)' },
  'grand budapest hotel': { tipo: 'lookup', id: 1440789547, nombre: 'The Grand Budapest Hotel (Original Soundtrack)' },
  'the grand budapest hotel': { tipo: 'lookup', id: 1440789547, nombre: 'The Grand Budapest Hotel (Original Soundtrack)' },
  'amelie': { tipo: 'search', term: 'Yann Tiersen Amelie', nombre: 'Amélie (Yann Tiersen)' },
  'amélie': { tipo: 'search', term: 'Yann Tiersen Amelie', nombre: 'Amélie (Yann Tiersen)' },
  'fight club': { tipo: 'search', term: 'Pixies Where Is My Mind Dust Brothers Fight Club', nombre: 'Fight Club (Soundtrack)' },
  'el club de la pelea': { tipo: 'search', term: 'Pixies Where Is My Mind', nombre: 'Fight Club (Soundtrack)' },
  'goodfellas': { tipo: 'search', term: 'Derek and the Dominos Layla Tony Bennett Rags to Riches', nombre: 'Goodfellas (Soundtrack)' },
  'buenos muchachos': { tipo: 'search', term: 'Derek and the Dominos Layla Tony Bennett Rags to Riches', nombre: 'Goodfellas (Soundtrack)' },
  'nueve reinas': { tipo: 'search', term: 'Rita Pavone Il Ballo Del Mattone', nombre: 'Nueve Reinas (Tema clásico)' },
  'gladiator': { tipo: 'lookup', id: 1440563157, nombre: 'Gladiator (Soundtrack from the Motion Picture)' },
  'gladiador': { tipo: 'lookup', id: 1440563157, nombre: 'Gladiator (Soundtrack from the Motion Picture)' },
  'star wars': { tipo: 'lookup', id: 1375814280, nombre: 'Star Wars (Original Motion Picture Score)' },
  'back to the future': { tipo: 'lookup', id: 1440829748, nombre: 'Back to the Future (Original Motion Picture Soundtrack)' },
  'volver al futuro': { tipo: 'lookup', id: 1440829748, nombre: 'Back to the Future (Original Motion Picture Soundtrack)' }
};

function formatDuration(ms) {
  if (!ms) return '0:30';
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = String(totalSec % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

/**
 * Obtiene las canciones de un álbum específico en iTunes a partir de su collectionId.
 */
async function fetchTracksByCollectionId(collectionId, maxTracks = 12, nota = '') {
  const res = await fetch(`https://itunes.apple.com/lookup?id=${collectionId}&entity=song`);
  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status} al consultar el álbum ${collectionId}`);
  }
  const data = await res.json();
  const tracks = (data.results || []).filter((r) => r.wrapperType === 'track' && r.previewUrl);
  return tracks.slice(0, maxTracks).map((t) => ({ ...t, _origenNota: nota }));
}

export default function ApiConsumo() {
  const [tracks, setTracks] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [coleccionActiva, setColeccionActiva] = useState('guillermo');
  const [modoBusqueda, setModoBusqueda] = useState('auto'); // 'auto' | 'soundtrack' | 'musica'
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [inputBusqueda, setInputBusqueda] = useState('');
  const [subtituloActivo, setSubtituloActivo] = useState('');
  const [recargaManual, setRecargaManual] = useState(0);

  const [playingTrackId, setPlayingTrackId] = useState(null);
  const audioRef = useRef(null);

  const detenerAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingTrackId(null);
  }, []);

  const cargarDatos = useCallback(async () => {
    detenerAudio();
    setCargando(true);
    setError(null);

    try {
      // Caso 1: Colección predefinida del equipo (trae exactamente los 3 discos del integrante o soundtracks)
      if (coleccionActiva !== 'custom') {
        const col = COLECCIONES_EQUIPO.find((c) => c.id === coleccionActiva) || COLECCIONES_EQUIPO[0];
        setSubtituloActivo(col.descripcion);

        const promesas = col.fuentes.map(async (fuente) => {
          if (fuente.tipo === 'lookup') {
            return fetchTracksByCollectionId(fuente.id, fuente.max, fuente.nota);
          }
          const url = `https://itunes.apple.com/search?term=${encodeURIComponent(fuente.term)}&entity=song&limit=15`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
          const data = await res.json();
          let lista = (data.results || []).filter((t) => t.previewUrl);
          if (fuente.artistFilter) {
            const filtrada = lista.filter((t) =>
              t.artistName.toLowerCase().includes(fuente.artistFilter.toLowerCase())
            );
            if (filtrada.length > 0) lista = filtrada;
          }
          return lista.slice(0, fuente.max).map((t) => ({ ...t, _origenNota: fuente.nota }));
        });

        const grupos = await Promise.all(promesas);
        setTracks(grupos.flat());
        return;
      }

      // Caso 2: Búsqueda personalizada ingresada por el usuario
      const limpio = terminoBusqueda.trim().toLowerCase();

      // 2a. Si coincide con una película conocida del catálogo/equipo, resolvemos su Soundtrack oficial
      if (PELICULAS_CONOCIDAS[limpio]) {
        const peli = PELICULAS_CONOCIDAS[limpio];
        setSubtituloActivo(`Banda sonora oficial: ${peli.nombre}`);

        if (peli.tipo === 'lookup') {
          const resultado = await fetchTracksByCollectionId(peli.id, 12, peli.nombre);
          setTracks(resultado);
          return;
        }
        if (peli.tipo === 'queries') {
          const promesas = peli.terms.map(async (q) => {
            const r = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=3`);
            const d = await r.json();
            return (d.results || []).slice(0, 3).map((t) => ({ ...t, _origenNota: peli.nombre }));
          });
          const resList = await Promise.all(promesas);
          setTracks(resList.flat());
          return;
        }
        if (peli.tipo === 'search') {
          const r = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(peli.term)}&entity=song&limit=12`);
          const d = await r.json();
          setTracks((d.results || []).map((t) => ({ ...t, _origenNota: peli.nombre })));
          return;
        }
      }

      // 2b. Si el usuario eligió buscar Soundtrack de Película (o modo automático intentando detectar soundtrack)
      if (modoBusqueda === 'soundtrack' || modoBusqueda === 'auto') {
        const albumSearchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(terminoBusqueda + ' Soundtrack')}&entity=album&limit=20`;
        const albRes = await fetch(albumSearchUrl);
        if (albRes.ok) {
          const albData = await albRes.json();
          const palabras = limpio.split(/\s+/).filter((w) => w.length > 2);
          const albumOst = (albData.results || []).find((a) => {
            const nombreAlb = (a.collectionName || '').toLowerCase();
            const coincideTitulo = palabras.every((p) => nombreAlb.includes(p));
            const esSoundtrack =
              /soundtrack|motion picture|score|original|film|music from/i.test(a.collectionName || '') ||
              /soundtrack/i.test(a.primaryGenreName || '');
            return a.trackCount > 4 && coincideTitulo && esSoundtrack;
          });

          if (albumOst && (modoBusqueda === 'soundtrack' || albumOst.collectionName.toLowerCase().startsWith(limpio))) {
            setSubtituloActivo(`Álbum de banda sonora: ${albumOst.collectionName}`);
            const ostTracks = await fetchTracksByCollectionId(albumOst.collectionId, 12, albumOst.collectionName);
            if (ostTracks.length > 0) {
              setTracks(ostTracks);
              return;
            }
          }
        }
      }

      // 2c. Búsqueda de Disco o Artista (prioriza álbum completo si el término coincide con el nombre de un disco)
      const queryFinal = modoBusqueda === 'soundtrack' ? `${terminoBusqueda} Soundtrack` : terminoBusqueda;
      setSubtituloActivo(`Resultados en vivo para "${queryFinal}"`);

      const songUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(queryFinal)}&entity=song&limit=12`;
      const response = await fetch(songUrl);
      if (!response.ok) {
        throw new Error(`Error en el servidor: HTTP ${response.status}`);
      }
      const data = await response.json();
      setTracks(data.results || []);
    } catch (err) {
      setError(err.message || 'Error desconocido al conectar con la API pública de Apple iTunes.');
    } finally {
      setCargando(false);
    }
  }, [coleccionActiva, terminoBusqueda, modoBusqueda, recargaManual, detenerAudio]);

  useEffect(() => {
    cargarDatos();
    return () => detenerAudio();
  }, [cargarDatos, detenerAudio]);

  const handleSelectColeccion = (e) => {
    const id = e.target.value;
    setColeccionActiva(id);
    setInputBusqueda('');
  };

  const handleSubmitBusqueda = (e) => {
    e.preventDefault();
    if (!inputBusqueda.trim()) return;
    setColeccionActiva('custom');
    setTerminoBusqueda(inputBusqueda.trim());
  };

  const handleToggleAudio = (trackId, previewUrl) => {
    if (!audioRef.current || !previewUrl) return;

    if (playingTrackId === trackId) {
      audioRef.current.pause();
      setPlayingTrackId(null);
    } else {
      audioRef.current.src = previewUrl;
      audioRef.current.volume = 0.75;
      audioRef.current.play().catch(() => {
        setPlayingTrackId(null);
      });
      setPlayingTrackId(trackId);
    }
  };

  const forzarErrorPrueba = () => {
    detenerAudio();
    setCargando(true);
    setTimeout(() => {
      setError('Error simulado de red (HTTP 503 Service Unavailable) para verificar el estado de error y la recuperación.');
      setCargando(false);
    }, 400);
  };

  return (
    <div className="api-page">
      <div style={{ marginBottom: '2.25rem' }}>
        <span style={{
          fontFamily: 'var(--fuente-codigo)',
          fontSize: '0.8rem',
          color: 'var(--tomate)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          API Pública Externa · Apple iTunes Search & Lookup API (REST JSON)
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', margin: '0.2rem 0 0.8rem' }}>
          Explorador en Vivo: Discos del Equipo y Bandas Sonoras
        </h1>
        <div style={{
          background: 'var(--crema)',
          border: '1px solid var(--linea)',
          borderRadius: 'var(--radio)',
          padding: '1.25rem 1.5rem',
          maxWidth: '880px',
          boxShadow: 'var(--sombra)'
        }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--tinta-2)', lineHeight: 1.5 }}>
            <strong>¿Qué información aporta esta API?</strong> Conecta en tiempo real con los endpoints públicos{' '}
            <code>/lookup</code> y <code>/search</code> de{' '}
            <a
              href="https://performance-partners.apple.com/search-api"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 600 }}
            >
              Apple iTunes API
            </a>{' '}
            para traer los <strong>3 discos exactos de cada integrante del grupo</strong> (4 temas por álbum) y las{' '}
            <strong>bandas sonoras oficiales de nuestras películas</strong> con sus portadas originales y fragmentos de
            audio de 30 segundos.
          </p>
        </div>
      </div>

      <section style={{
        background: 'var(--papel)',
        border: '1px solid var(--linea)',
        borderRadius: 'var(--radio)',
        padding: '1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.15rem',
        boxShadow: 'var(--sombra)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          alignItems: 'end'
        }}>
          <div>
            <label htmlFor="select-coleccion" style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: 'var(--tinta-2)', marginBottom: '0.35rem' }}>
              💿 Discos por Integrante / Bandas Sonoras del Equipo:
            </label>
            <select
              id="select-coleccion"
              value={coleccionActiva}
              onChange={handleSelectColeccion}
              disabled={cargando}
              style={{
                width: '100%',
                padding: '0.68rem 0.95rem',
                borderRadius: 'var(--radio-sm)',
                border: '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              {COLECCIONES_EQUIPO.map((c) => (
                <option key={c.id} value={c.id}>{c.etiqueta}</option>
              ))}
              {coleccionActiva === 'custom' && (
                <option value="custom">🔎 Búsqueda libre: "{terminoBusqueda}"</option>
              )}
            </select>
          </div>

          <form onSubmit={handleSubmitBusqueda} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 180px' }}>
              <label htmlFor="input-api-search" style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: 'var(--tinta-2)', marginBottom: '0.35rem' }}>
                🔍 Buscar película (soundtrack), disco o banda:
              </label>
              <input
                id="input-api-search"
                type="text"
                value={inputBusqueda}
                onChange={(e) => setInputBusqueda(e.target.value)}
                placeholder="Ej: Pulp Fiction, Kill Bill, El Padrino, Pink Floyd..."
                style={{
                  width: '100%',
                  padding: '0.65rem 0.95rem',
                  borderRadius: 'var(--radio-sm)',
                  border: '1px solid var(--linea)',
                  background: 'var(--crema)',
                  fontFamily: 'var(--fuente-texto)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div style={{ flex: '0 0 auto' }}>
              <label htmlFor="select-modo-busqueda" style={{ display: 'block', fontWeight: 600, fontSize: '0.78rem', color: 'var(--suave)', marginBottom: '0.35rem' }}>
                Tipo:
              </label>
              <select
                id="select-modo-busqueda"
                value={modoBusqueda}
                onChange={(e) => setModoBusqueda(e.target.value)}
                style={{
                  padding: '0.65rem 0.65rem',
                  borderRadius: 'var(--radio-sm)',
                  border: '1px solid var(--linea)',
                  background: 'var(--crema)',
                  fontFamily: 'var(--fuente-texto)',
                  fontSize: '0.86rem'
                }}
              >
                <option value="auto">Automático</option>
                <option value="soundtrack">🎬 Soundtrack Película</option>
                <option value="musica">💿 Disco / Artista</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-birra btn-sm"
              disabled={cargando || !inputBusqueda.trim()}
              style={{ height: '41px', flexShrink: 0 }}
            >
              Buscar
            </button>
          </form>
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
          <span style={{ fontSize: '0.86rem', color: 'var(--suave)', fontFamily: 'var(--fuente-codigo)' }}>
            Mostrando: <strong style={{ color: 'var(--tinta)' }}>{subtituloActivo}</strong>
          </span>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-birra btn-sm"
              onClick={() => setRecargaManual((prev) => prev + 1)}
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
      </section>

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
            💿
          </div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--tinta)', marginBottom: '0.35rem' }}>
            Consultando álbumes y bandas sonoras en Apple iTunes...
          </h3>
          <p style={{ color: 'var(--suave)', fontSize: '0.95rem' }}>
            Descargando portadas originales y pistas de audio de 30 segundos.
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
            onClick={cargarDatos}
            style={{ background: '#b91c1c' }}
          >
            🔁 Reintentar consulta a la API
          </button>
        </div>
      )}

      {!cargando && !error && (
        <>
          <p style={{ fontSize: '0.9rem', color: 'var(--suave)', marginBottom: '1rem' }}>
            Se cargaron <strong>{tracks.length}</strong> pistas verificadas con vista previa de audio:
          </p>

          {tracks.length > 0 ? (
            <div className="breweries-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '1.4rem'
            }}>
              {tracks.map((track) => {
                const isPlaying = playingTrackId === track.trackId;
                const highResCover = track.artworkUrl100
                  ? track.artworkUrl100.replace('100x100bb', '300x300bb')
                  : '';
                const anio = track.releaseDate ? new Date(track.releaseDate).getFullYear() : '';

                return (
                  <article
                    key={`${track.trackId}-${track.collectionId}`}
                    className="card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '1.35rem',
                      border: isPlaying ? '2px solid var(--birra)' : undefined
                    }}
                  >
                    <div>
                      {track._origenNota && (
                        <div style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--fuente-codigo)',
                          color: 'var(--codigo)',
                          marginBottom: '0.55rem',
                          fontWeight: 600
                        }}>
                          {track._origenNota}
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                        {highResCover && (
                          <div className={`album-cover-wrap ${isPlaying ? 'is-playing' : ''}`} style={{ width: '76px', height: '76px' }}>
                            <img
                              src={highResCover}
                              alt={`Portada de ${track.collectionName || track.trackName}`}
                              className="album-cover-img"
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                            <span className="badge badge-birra" style={{ fontSize: '0.68rem' }}>
                              {track.primaryGenreName || 'Música'}
                            </span>
                            {anio && (
                              <span style={{ fontSize: '0.75rem', color: 'var(--suave)', fontFamily: 'var(--fuente-codigo)' }}>
                                {anio}
                              </span>
                            )}
                          </div>

                          <h3 style={{
                            fontSize: '1.08rem',
                            color: 'var(--tinta)',
                            marginBottom: '0.2rem',
                            lineHeight: 1.25
                          }}>
                            {track.trackName}
                          </h3>

                          <p style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--tomate-oscuro)' }}>
                            {track.artistName}
                          </p>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.83rem', color: 'var(--suave)', marginBottom: '0.85rem' }}>
                        💿 <strong>Álbum:</strong> {track.collectionName || 'Single'} · ⏱ {formatDuration(track.trackTimeMillis)}
                      </p>
                    </div>

                    <div style={{
                      borderTop: '1px dashed var(--linea)',
                      paddingTop: '0.85rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.6rem',
                      flexWrap: 'wrap'
                    }}>
                      {track.previewUrl ? (
                        <button
                          type="button"
                          className={`media-action-btn ${isPlaying ? 'is-playing' : ''}`}
                          style={{ marginTop: 0 }}
                          onClick={() => handleToggleAudio(track.trackId, track.previewUrl)}
                        >
                          <span>{isPlaying ? '⏸' : '▶'}</span>
                          <span>{isPlaying ? 'Pausar (30s)' : 'Escuchar (30s)'}</span>
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: 'var(--suave)', fontStyle: 'italic' }}>
                          Sin preview
                        </span>
                      )}

                      {track.trackViewUrl && (
                        <a
                          href={track.trackViewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: '0.78rem', fontFamily: 'var(--fuente-codigo)', fontWeight: 600 }}
                        >
                          Ficha iTunes ↗
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div style={{
              background: 'var(--papel)',
              border: '2px dashed var(--linea)',
              borderRadius: 'var(--radio)',
              padding: '3rem 1.5rem',
              textAlign: 'center',
              color: 'var(--suave)'
            }}>
              No se encontraron discos o bandas sonoras para "{terminoBusqueda}". Probá con otro título o artista.
            </div>
          )}
        </>
      )}

      <audio
        ref={audioRef}
        onEnded={() => setPlayingTrackId(null)}
        style={{ display: 'none' }}
      />
    </div>
  );
}
