import styles from "./ServiceCard.module.css";

export default function ServiceCard({ servicio }) {
  const { title, description, image, precio, tag } = servicio;

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={image} alt={title} className={styles.img} loading="lazy" />
        {tag && <span className={styles.tag}>{tag}</span>}
      </div>
      <div className={styles.body}>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.text}>{description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{precio}</span>
          <a href="#reserva" className="btn-outline-gold">Reservar</a>
        </div>
      </div>
    </div>
  );
}
