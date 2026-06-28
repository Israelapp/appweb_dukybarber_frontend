import { useState, useMemo } from "react";
import { SERVICIOS } from "../data/servicios";

// Hook reutilizable: separa la lógica de filtrado del componente visual
export function useServicios() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const serviciosFiltrados = useMemo(() => {
    return SERVICIOS.filter((s) => {
      const coincideTexto =
        s.title.toLowerCase().includes(busqueda.toLowerCase()) ||
        s.description.toLowerCase().includes(busqueda.toLowerCase());

      const coincideCategoria =
        categoriaActiva === "Todos" || s.categoria === categoriaActiva;

      return coincideTexto && coincideCategoria;
    });
  }, [busqueda, categoriaActiva]);

  return { busqueda, setBusqueda, categoriaActiva, setCategoriaActiva, serviciosFiltrados };
}
