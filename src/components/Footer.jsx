import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contacto">
      <span className={styles.brand}>Duky Barber</span>
      <div className={styles.socials}>
        <a href="https://www.instagram.com/danis_barberia/" target="_blank" rel="noreferrer" aria-label="Instagram">
          <i className="fa-brands fa-instagram" />
        </a>
        <a href="https://www.facebook.com/danis_barberia/" target="_blank" rel="noreferrer" aria-label="Facebook">
          <i className="fa-brands fa-facebook" />
        </a>
        <a href="https://www.tiktok.com/danis_barberia/" target="_blank" rel="noreferrer" aria-label="TikTok">
          <i className="fa-brands fa-tiktok" />
        </a>
      </div>
      <p>Derechos reservados &copy; 2026 &mdash; Duky Barber</p>
    </footer>
  );
}
