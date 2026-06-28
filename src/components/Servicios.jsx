import { CATEGORIAS } from "../data/servicios";
import { useServicios } from "../hooks/useServicios";
import ServiceCard from "./ServiceCard";
import styles from "./Servicios.module.css";

export default function Servicios() {
  const { busqueda, setBusqueda, categoriaActiva, setCategoriaActiva, serviciosFiltrados } = useServicios();

  return (
    <section className={styles.section} id="servicios">
      <p className="section-label">Lo que ofrecemos</p>
      <h2 className="section-title">Nuestros Servicios</h2>

      {/* Buscador */}
      <div className={styles.searchWrap}>
        <input
          type="text"
          className={styles.search}
          placeholder="Buscar un corte o estilo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar servicio"
        />
        {busqueda && (
          <button className={styles.clearBtn} onClick={() => setBusqueda("")} aria-label="Limpiar búsqueda">
            ✕
          </button>
        )}
      </div>

      {/* Filtros por categoría */}
      <div className={styles.filters}>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${categoriaActiva === cat ? styles.active : ""}`}
            onClick={() => setCategoriaActiva(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de tarjetas */}
      <div className={styles.grid}>
        {serviciosFiltrados.length > 0 ? (
          serviciosFiltrados.map((s) => (
            <ServiceCard key={s.id} servicio={s} />
          ))
        ) : (
          <div className={styles.empty}>
            <p>No se encontraron servicios.</p>
            <button className="btn-outline-gold" onClick={() => { setBusqueda(""); setCategoriaActiva("Todos"); }}>
              Ver todos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
