import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "#inicio",    label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#reserva",   label: "Reserva" },
  { href: "#galeria",   label: "Galería" },
  { href: "#contacto",  label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [activeId, setActiveId]     = useState("inicio");
  const [menuOpen, setMenuOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detecta sección activa
      const sections = document.querySelectorAll("section[id], footer[id]");
      let current = "inicio";
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.solid : ""}`}>
      <a href="#inicio" className={styles.brand}>Duky Barber</a>

      {/* Hamburger (mobile) */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Menú"
      >
        <span /><span /><span />
      </button>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className={activeId === href.slice(1) ? styles.active : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
