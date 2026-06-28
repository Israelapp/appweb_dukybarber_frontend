import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <span className={styles.badge}>Estilo · Precisión · Confianza</span>

      <div className={styles.logoWrap}>
        <img
          src="/imagenes/log_duky.jpg"
          onError={(e) => { e.target.style.display = "none"; }}
          className={styles.logo}
          alt="Logo Duky Barber"
        />
      </div>

      <h1 className={styles.title}>
        Duky<br /><span>Barber</span>
      </h1>
      <p className={styles.subtitle}>Barbería profesional &mdash; Desde 2018</p>

      <div className={styles.socials}>
        <a href="https://www.instagram.com/danis_barberia/" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-instagram" /> Instagram
        </a>
        <a href="https://www.facebook.com/danis_barberia/" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-facebook" /> Facebook
        </a>
        <a href="https://www.tiktok.com/danis_barberia/" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-tiktok" /> TikTok
        </a>
      </div>

      <div className={styles.cta}>
        <a href="#reserva" className="btn-gold">Reservar turno</a>
      </div>
    </section>
  );
}
