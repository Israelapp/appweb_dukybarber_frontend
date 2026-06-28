import { useState } from "react";
import { SERVICIOS } from "../data/servicios";
import styles from "./Reserva.module.css";

const INITIAL = { nombre: "", email: "", telefono: "", servicio: "", fecha: "" };

export default function Reserva() {
  const [form, setForm]       = useState(INITIAL);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: undefined }));
  };

  const handleSubmit = async () => {
    setServerError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre:     form.nombre,
          email:      form.email,
          telefono:   form.telefono,
          servicio:   form.servicio,
          fecha_hora: form.fecha,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        if (data.errores) setErrors(data.errores);
        else setServerError("Error al guardar la reserva. Intenta de nuevo.");
        return;
      }

      setSuccess(true);
      setForm(INITIAL);
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      setLoading(false);
      setServerError("No se pudo conectar con el servidor. ¿Está corriendo el backend?");
    }
  };

  return (
    <section className={styles.section} id="reserva">
      <p className="section-label">Agenda tu cita</p>
      <h2 className="section-title">Reserva tu Turno</h2>

      <div className={styles.form}>
        {success && (
          <div className={styles.successMsg}>
            ✅ ¡Reserva enviada! Revisa tu email de confirmación.
          </div>
        )}
        {serverError && (
          <div className={styles.errorMsg}>{serverError}</div>
        )}

        <div>
          <label className={styles.label} htmlFor="nombre">Tu nombre *</label>
          <input id="nombre" name="nombre" type="text"
            className={`${styles.input} ${errors.nombre ? styles.inputError : ""}`}
            placeholder="Ej. Juan García" value={form.nombre} onChange={handleChange} />
          {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
        </div>

        <div>
          <label className={styles.label} htmlFor="email">Email *</label>
          <input id="email" name="email" type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            placeholder="juan@email.com" value={form.email} onChange={handleChange} />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div>
          <label className={styles.label} htmlFor="telefono">Teléfono (opcional)</label>
          <input id="telefono" name="telefono" type="tel"
            className={styles.input}
            placeholder="+54 11 1234 5678" value={form.telefono} onChange={handleChange} />
        </div>

        <div>
          <label className={styles.label} htmlFor="servicio">Servicio *</label>
          <select id="servicio" name="servicio"
            className={`${styles.input} ${errors.servicio ? styles.inputError : ""}`}
            value={form.servicio} onChange={handleChange}>
            <option value="">Seleccionar servicio...</option>
            {SERVICIOS.map((s) => (
              <option key={s.id} value={s.title}>{s.title} — {s.precio}</option>
            ))}
          </select>
          {errors.servicio && <span className={styles.error}>{errors.servicio}</span>}
        </div>

        <div>
          <label className={styles.label} htmlFor="fecha">Fecha y hora *</label>
          <input id="fecha" name="fecha" type="datetime-local"
            className={`${styles.input} ${errors.fecha_hora ? styles.inputError : ""}`}
            value={form.fecha} onChange={handleChange} />
          {errors.fecha_hora && <span className={styles.error}>{errors.fecha_hora}</span>}
        </div>

        <button
          className="btn-gold"
          style={{ marginTop: "0.5rem", width: "100%", opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Confirmar Reserva"}
        </button>
      </div>
    </section>
  );
}