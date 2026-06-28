import { useState, useEffect } from "react";
import { SERVICIOS } from "../data/servicios";
import styles from "./Reserva.module.css";

const API = "http://localhost:5000/api";
const INITIAL = { nombre: "", email: "", telefono: "", servicio: "", fecha: "", hora: "" };

// Días que NO trabaja (para deshabilitar en el calendario)
function diasNoTrabajo(diasTrabajo) {
  const todos = [0, 1, 2, 3, 4, 5, 6]; // 0=Dom JS
  const trabaja = diasTrabajo.split(",").map(d => {
    const n = parseInt(d);
    return n === 7 ? 0 : n; // 7=Dom backend → 0=Dom JS
  });
  return todos.filter(d => !trabaja.includes(d));
}

export default function Reserva() {
  const [form, setForm]         = useState(INITIAL);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [serverError, setServerError] = useState("");

  const [slots, setSlots]       = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [config, setConfig]     = useState(null);

  // Cargar config del negocio al montar
  useEffect(() => {
    fetch(`${API}/config`)
      .then(r => r.json())
      .then(setConfig)
      .catch(() => {});
  }, []);

  // Cargar slots cuando cambia la fecha
  useEffect(() => {
    if (!form.fecha) { setSlots([]); return; }
    setLoadingSlots(true);
    setForm(f => ({ ...f, hora: "" }));
    fetch(`${API}/slots?fecha=${form.fecha}`)
      .then(r => r.json())
      .then(data => { setSlots(data.slots || []); setLoadingSlots(false); })
      .catch(() => { setSlots([]); setLoadingSlots(false); });
  }, [form.fecha]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: undefined }));
  };

  // Fecha mínima = hoy
  const hoy = new Date().toISOString().split("T")[0];

  // Calcular fecha máxima para deshabilitar días libres (no se puede con input date nativo, 
  // pero sí podemos validar al submit)
  const validarFecha = (fechaStr) => {
    if (!config) return true;
    const fecha = new Date(fechaStr + "T00:00:00");
    const diaSemana = fecha.getDay(); // 0=Dom JS
    const noTrabaja = diasNoTrabajo(config.dias_trabajo);
    return !noTrabaja.includes(diaSemana);
  };

  const handleSubmit = async () => {
    setServerError("");

    // Validación local
    const e = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!form.email.trim())  e.email  = "El email es obligatorio.";
    if (form.telefono) {
      const tel = form.telefono.replace(/\s/g, "");
      if (!/^(\+34|0034)?[6789]\d{8}$/.test(tel))
        e.telefono = "Teléfono inválido. Ej: 612 345 678 o +34 612 345 678";
    }
    if (!form.servicio)  e.servicio  = "Selecciona un servicio.";
    if (!form.fecha)     e.fecha     = "Selecciona una fecha.";
    else if (!validarFecha(form.fecha)) e.fecha = "El barbero no trabaja ese día.";
    if (!form.hora)      e.hora      = "Selecciona una hora.";

    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API}/reservas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre:     form.nombre,
          email:      form.email,
          telefono:   form.telefono.replace(/\s/g, "") || undefined,
          servicio:   form.servicio,
          fecha_hora: `${form.fecha}T${form.hora}`,
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
      setSlots([]);
      setTimeout(() => setSuccess(false), 7000);
    } catch {
      setLoading(false);
      setServerError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <section className={styles.section} id="reserva">
      <p className="section-label">Agenda tu cita</p>
      <h2 className="section-title">Reserva tu Turno</h2>

      <div className={styles.form}>
        {success && <div className={styles.successMsg}>✅ ¡Reserva enviada! Revisa tu email de confirmación.</div>}
        {serverError && <div className={styles.errorMsg}>{serverError}</div>}

        {/* Nombre */}
        <div>
          <label className={styles.label} htmlFor="nombre">Tu nombre *</label>
          <input id="nombre" name="nombre" type="text"
            className={`${styles.input} ${errors.nombre ? styles.inputError : ""}`}
            placeholder="Ej. Juan García" value={form.nombre} onChange={handleChange} />
          {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
        </div>

        {/* Email */}
        <div>
          <label className={styles.label} htmlFor="email">Email *</label>
          <input id="email" name="email" type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            placeholder="juan@email.com" value={form.email} onChange={handleChange} />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        {/* Teléfono España */}
        <div>
          <label className={styles.label} htmlFor="telefono">Teléfono (opcional)</label>
          <div className={styles.phoneWrap}>
            <span className={styles.phonePrefix}>🇪🇸 +34</span>
            <input id="telefono" name="telefono" type="tel"
              className={`${styles.input} ${styles.phoneInput} ${errors.telefono ? styles.inputError : ""}`}
              placeholder="612 345 678" value={form.telefono} onChange={handleChange}
              maxLength={15} />
          </div>
          {errors.telefono && <span className={styles.error}>{errors.telefono}</span>}
        </div>

        {/* Servicio */}
        <div>
          <label className={styles.label} htmlFor="servicio">Servicio *</label>
          <select id="servicio" name="servicio"
            className={`${styles.input} ${errors.servicio ? styles.inputError : ""}`}
            value={form.servicio} onChange={handleChange}>
            <option value="">Seleccionar servicio...</option>
            {SERVICIOS.map(s => (
              <option key={s.id} value={s.title}>{s.title} — {s.precio}</option>
            ))}
          </select>
          {errors.servicio && <span className={styles.error}>{errors.servicio}</span>}
        </div>

        {/* Fecha */}
        <div>
          <label className={styles.label} htmlFor="fecha">Fecha *</label>
          <input id="fecha" name="fecha" type="date"
            className={`${styles.input} ${errors.fecha ? styles.inputError : ""}`}
            min={hoy} value={form.fecha} onChange={handleChange} />
          {errors.fecha && <span className={styles.error}>{errors.fecha}</span>}
        </div>

        {/* Slots de hora */}
        {form.fecha && (
          <div>
            <label className={styles.label}>Hora disponible *</label>
            {loadingSlots ? (
              <p className={styles.slotLoading}>Cargando horarios...</p>
            ) : slots.length > 0 ? (
              <div className={styles.slotsGrid}>
                {slots.map(slot => (
                  <button key={slot} type="button"
                    className={`${styles.slotBtn} ${form.hora === slot ? styles.slotActive : ""}`}
                    onClick={() => { setForm(f => ({ ...f, hora: slot })); setErrors(e => ({ ...e, hora: undefined })); }}>
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <p className={styles.slotEmpty}>No hay horarios disponibles para este día.</p>
            )}
            {errors.hora && <span className={styles.error}>{errors.hora}</span>}
          </div>
        )}

        <button className="btn-gold"
          style={{ marginTop: "0.5rem", width: "100%", opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit} disabled={loading}>
          {loading ? "Enviando..." : "Confirmar Reserva"}
        </button>
      </div>
    </section>
  );
}
