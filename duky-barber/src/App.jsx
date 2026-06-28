import Navbar   from "./components/Navbar";
import Hero     from "./components/Hero";
import Servicios from "./components/Servicios";
import Reserva  from "./components/Reserva";
import Footer   from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Servicios />
      <Reserva />
      <Footer />
    </>
  );
}
