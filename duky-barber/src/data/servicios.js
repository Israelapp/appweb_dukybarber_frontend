// ── DATOS DE SERVICIOS ──
// Para agregar un nuevo servicio, simplemente añade un objeto al array.

export const SERVICIOS = [
  {
    id: 1,
    title: "Fade & Style",
    description: "Cortes de precisión adaptados a tu forma de cara y estilo personal. Desde fades clásicos hasta tapers modernos.",
    image: "https://i.pinimg.com/736x/d2/12/ac/d212acb7c9e33083d98d89dce0fc6141.jpg",
    categoria: "Corte y Barba",
    precio: "$15",
    tag: "Popular",
  },
  {
    id: 2,
    title: "Scissor Cut",
    description: "Trabajo con tijeras para looks texturizados, naturales o en capas. Técnica refinada para un acabado impecable.",
    image: "https://i.pinimg.com/736x/fe/01/45/fe014573b1addcfe3197d192a1a0d09c.jpg",
    categoria: "Corte Clásico",
    precio: "$20",
    tag: "Premium",
  },
  {
    id: 3,
    title: "Servicio Completo",
    description: "Tratamiento premium que incluye corte personalizado, perfilado de barba y secado profesional.",
    image: "https://i.pinimg.com/736x/d2/12/ac/d212acb7c9e33083d98d89dce0fc6141.jpg",
    categoria: "Corte, Barba y Secado",
    precio: "$30",
    tag: "Todo incluido",
  },
];

// Categorías únicas generadas automáticamente desde los datos
export const CATEGORIAS = ["Todos", ...new Set(SERVICIOS.map((s) => s.categoria))];
