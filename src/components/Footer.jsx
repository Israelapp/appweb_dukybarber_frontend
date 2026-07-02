import styles from "./Footer.module.css";

const BARBERIA = {
  nombre:    "Duky Barber",
  direccion: "15 VA-220, Peñafiel, Castilla y León",
  telefono:  "+34 612 345 678",
  instagram: "https://www.instagram.com/danis_barberia/",
  facebook:  "https://www.facebook.com/danis_barberia/",
  tiktok:    "https://www.tiktok.com/danis_barberia/",
  lat:       41.6002764,
  lng:       -4.1180893,
  apiKey:    "AIzaSyC2v_rFuN1kOYcPOPaWQX7Xaz39MMowD48",
};

export default function Footer() {
  const mapsUrl  = `https://www.google.com/maps?q=${BARBERIA.lat},${BARBERIA.lng}`;
const embedUrl = `https://maps.google.com/maps?q=${BARBERIA.lat},${BARBERIA.lng}&z=16&output=embed`;

  return (
    <footer className={styles.footer} id="contacto">
      <div className={styles.grid}>

        <div className={styles.info}>
          <span className={styles.brand}>Duky Barber</span>
          <p className={styles.desc}>Barbería profesional desde 2018.<br />Estilo, precisión y confianza.</p>

          <div className={styles.contactItem}>
            <span>📍</span>
            <a href={mapsUrl} target="_blank" rel="noreferrer">{BARBERIA.direccion}</a>
          </div>
          <div className={styles.contactItem}>
            <span>📞</span>
            <a href={`tel:${BARBERIA.telefono.replace(/\s/g, "")}`}>{BARBERIA.telefono}</a>
          </div>

          <div className={styles.socials}>
            <a href={BARBERIA.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fa-brands fa-instagram" />
            </a>
            <a href={BARBERIA.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fa-brands fa-facebook" />
            </a>
            <a href={BARBERIA.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
              <i className="fa-brands fa-tiktok" />
            </a>
          </div>
        </div>

        <div className={styles.mapWrap}>
          {BARBERIA.apiKey !== "TU_API_KEY_AQUI" ? (
            <iframe
              title="Ubicación Duky Barber"
              src={embedUrl}
              className={styles.map}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <a href={mapsUrl} target="_blank" rel="noreferrer" className={styles.mapPlaceholder}>
              <span>📍</span>
              <p>Ver ubicación en Google Maps</p>
              <span className={styles.mapHint}>Añade tu API Key para mostrar el mapa aquí</span>
            </a>
          )}
        </div>

      </div>

      <div className={styles.bottom}>
        <p>Derechos reservados &copy; 2026 &mdash; Duky Barber</p>
      </div>
    </footer>
  );
}