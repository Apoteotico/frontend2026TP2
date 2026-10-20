import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { integrantes } from '../data/integrantes';
import catalogo from '../data/catalogo.json';

export default function Home() {
  const [nocheSorteada, setNocheSorteada] = useState(null);
  const [animandoSorteo, setAnimandoSorteo] = useState(false);
  const navigate = useNavigate();

  const sortearNoche = () => {
    setAnimandoSorteo(true);
    setTimeout(() => {
      const azar = catalogo[Math.floor(Math.random() * catalogo.length)];
      setNocheSorteada(azar);
      setAnimandoSorteo(false);
    }, 450);
  };

  return (
    <div className="home-page">
      <section className="home-hero-marquee">
        <div style={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
          <span style={{
            fontFamily: 'var(--fuente-codigo)',
            color: 'var(--birra)',
            fontSize: '0.82rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '0.5rem'
          }}>
            &lt;TP2 React · Grupo 21&gt;
          </span>
          <h1 style={{
            fontSize: 'clamp(2.3rem, 5.5vw, 3.8rem)',
            color: 'var(--mozzarella)',
            marginBottom: '1rem',
            lineHeight: 1.1
          }}>
            pIT<span style={{ color: 'var(--birra)' }}>zza</span> y birrAPI
          </h1>
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'rgba(246, 241, 231, 0.88)',
            marginBottom: '1.75rem',
            maxWidth: '680px'
          }}>
            Cinco personas, una productora: cocinamos código en React, servimos birra artesanal
            y maridamos películas de culto con desafíos de desarrollo para la semana.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2.5rem' }}>
            <a href="#integrantes-section" className="btn">
              Ver afiches del equipo
            </a>
            <Link to="/catalogo" className="btn btn-birra">
              Explorar Catálogo (24 Maridajes)
            </Link>
            <Link to="/api" className="btn btn-ghost" style={{ color: 'var(--mozzarella)', borderColor: 'rgba(246, 241, 231, 0.3)' }}>
              API Discos y Cine
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            borderTop: '1px solid rgba(246, 241, 231, 0.15)',
            paddingTop: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src="/img/icono-cine.svg" alt="" width="26" height="26" />
              <span style={{ fontSize: '0.9rem', color: 'rgba(246, 241, 231, 0.8)' }}>Cartelera de Cine</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src="/img/icono-pizza.svg" alt="" width="26" height="26" />
              <span style={{ fontSize: '0.9rem', color: 'rgba(246, 241, 231, 0.8)' }}>Pizza Artesanal</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src="/img/icono-birra.svg" alt="" width="26" height="26" />
              <span style={{ fontSize: '0.9rem', color: 'rgba(246, 241, 231, 0.8)' }}>Birra de Autor</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src="/img/icono-codigo.svg" alt="" width="26" height="26" />
              <span style={{ fontSize: '0.9rem', color: 'rgba(246, 241, 231, 0.8)' }}>Código React</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{
        background: 'var(--papel)',
        border: '1px solid var(--linea)',
        borderRadius: 'var(--radio)',
        padding: '2rem',
        boxShadow: 'var(--sombra)',
        marginBottom: '3.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-birra" style={{ marginBottom: '0.4rem' }}>Interacción Interactiva</span>
            <h2>Mostrador: Sortear función de hoy</h2>
            <p style={{ color: 'var(--suave)', fontSize: '0.95rem', marginTop: '0.2rem' }}>
              Un clic: combiná al azar una película de culto, pizza artesanal, birra y un mini-proyecto de código.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-birra"
            onClick={sortearNoche}
            disabled={animandoSorteo}
          >
            {animandoSorteo ? "Sorteando..." : "🎲 Sortear mi noche"}
          </button>
        </div>

        {nocheSorteada ? (
          <div style={{
            background: 'var(--crema)',
            border: '2px dashed var(--birra)',
            borderRadius: 'var(--radio-sm)',
            padding: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            animation: 'fadeIn 0.3s ease-in'
          }}>
            <div>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--fuente-codigo)', color: 'var(--tomate)', textTransform: 'uppercase' }}>🎬 Película</span>
              <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--tinta)' }}>{nocheSorteada.pelicula}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--suave)' }}>Dir. {nocheSorteada.director} ({nocheSorteada.anio})</p>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--fuente-codigo)', color: 'var(--birra-oscura)', textTransform: 'uppercase' }}>🍕 Pizza Maridada</span>
              <p style={{ fontWeight: 600, color: 'var(--tinta)' }}>{nocheSorteada.pizza}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--fuente-codigo)', color: 'var(--codigo)', textTransform: 'uppercase' }}>🍺 Cerveza Recomendada</span>
              <p style={{ fontWeight: 600, color: 'var(--tinta)' }}>{nocheSorteada.birra}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--fuente-codigo)', color: 'var(--albahaca)', textTransform: 'uppercase' }}>💻 Reto de Código</span>
              <p style={{ fontWeight: 600, color: 'var(--tinta)' }}>{nocheSorteada.proyectoCodigo}</p>
              <span className="badge badge-albahaca" style={{ marginTop: '0.3rem' }}>{nocheSorteada.dificultad} · {nocheSorteada.tiempoEstimado}</span>
            </div>
            <div style={{
              gridColumn: '1 / -1',
              marginTop: '0.5rem',
              paddingTop: '0.85rem',
              borderTop: '1px dashed rgba(232, 167, 43, 0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--suave)', fontFamily: 'var(--fuente-codigo)' }}>
                ⚡ Sorteo reactivo vinculado a React Router y Catálogo
              </span>
              <button
                type="button"
                className="btn btn-birra btn-sm"
                onClick={() => navigate(`/catalogo?q=${encodeURIComponent(nocheSorteada.pelicula)}`)}
              >
                Ver en Catálogo con filtro directo →
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'var(--mozzarella)',
            borderRadius: 'var(--radio-sm)',
            padding: '1.25rem',
            textAlign: 'center',
            color: 'var(--suave)',
            fontSize: '0.95rem'
          }}>
            Hacé clic en <strong>"Sortear mi noche"</strong> para generar una propuesta maridada del catálogo en tiempo real.
          </div>
        )}
      </section>

      <section id="integrantes-section" style={{ marginBottom: '3.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--fuente-codigo)', fontSize: '0.78rem', color: 'var(--tomate)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Equipo de Rodaje
          </span>
          <h2>Los cinco afiches del equipo</h2>
          <p style={{ color: 'var(--suave)', fontSize: '0.95rem', marginTop: '0.2rem' }}>
            Cada tarjeta abre el perfil individual dentro de React, con sus datos, gustos e interacción interactiva.
          </p>
        </div>

        <div className="card-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}>
          {integrantes.map((miembro) => (
            <Link
              key={miembro.id}
              to={`/perfil/${miembro.slug}`}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div style={{
                aspectRatio: '4 / 5',
                position: 'relative',
                background: 'var(--tinta-2)',
                overflow: 'hidden'
              }}>
                <img
                  src={miembro.avatar}
                  alt={miembro.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <span style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: 'rgba(18, 16, 14, 0.75)',
                  backdropFilter: 'blur(4px)',
                  color: 'var(--birra)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--fuente-codigo)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '0.3rem'
                }}>
                  {miembro.ciudad}
                </span>
              </div>

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.6rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--tinta)' }}>{miembro.nombre}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--tomate-oscuro)', fontWeight: 600 }}>{miembro.rol}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--suave)', fontStyle: 'italic', flex: 1 }}>
                  "{miembro.frase}"
                </p>

                <div className="chip-row" style={{ marginTop: '0.4rem' }}>
                  {miembro.habilidades.slice(0, 2).map((h, i) => (
                    <span key={i} className="chip" style={{ fontSize: '0.75rem', padding: '0.15rem 0.55rem' }}>{h}</span>
                  ))}
                </div>

                <span style={{
                  color: 'var(--tomate)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  marginTop: '0.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  Ver perfil en React →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{
        background: 'var(--crema)',
        border: '1px solid var(--linea)',
        borderRadius: 'var(--radio)',
        padding: '2rem',
        boxShadow: 'var(--sombra)'
      }}>
        <h2>Estructura y módulos de la aplicación</h2>
        <p style={{ color: 'var(--suave)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Accedé directamente a los módulos principales del proyecto:
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          <Link to="/catalogo" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '1.6rem' }}>🍕</span>
            <h3 style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Catálogo Local (24 Ítems)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--suave)', marginTop: '0.3rem' }}>
              Base de datos en JSON local con búsqueda en tiempo real, filtros por categoría y vistas detalladas.
            </p>
          </Link>

          <Link to="/api" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '1.6rem' }}>💿</span>
            <h3 style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>API Discos y Bandas Sonoras</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--suave)', marginTop: '0.3rem' }}>
              Consumo asíncrono de Apple iTunes Search API con reproductor de 30s, estados de carga y manejo de errores.
            </p>
          </Link>

          <Link to="/arbol" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '1.6rem' }}>🌳</span>
            <h3 style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Árbol de Componentes</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--suave)', marginTop: '0.3rem' }}>
              Diagrama interactivo de la jerarquía de renderizado de React con nodos expandibles y colapsables.
            </p>
          </Link>

          <Link to="/bitacora" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '1.6rem' }}>📜</span>
            <h3 style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Bitácora de Desarrollo</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--suave)', marginTop: '0.3rem' }}>
              Registro de decisiones, dificultades y soluciones arquitectónicas con filtro por categoría.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
