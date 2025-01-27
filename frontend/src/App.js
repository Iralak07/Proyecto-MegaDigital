import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ReservaList from "./components/ReservaList";
import ReservaForm from "./components/ReservaForm";
import CrearHabitacion from "./components/CrearHabitacion";
import CrearPersona from "./components/CrearPersona";
import ActualizarPersona from "./components/ActualizarPersona";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link>
         | <Link to="/crear">Reservas</Link>
         | <Link to="/crear-habitacion">Habitación</Link>  
         | <Link to="/crear-persona">Persona</Link>
         </nav>
      <Routes>
        <Route path="/" element={<ReservaList refresh={refresh} />} />
        <Route path="/crear" element={<ReservaForm onSave={handleSave} />} />
        <Route path="/editar/:id" element={<ReservaForm onSave={handleSave} />} />
        <Route path="/crear-habitacion" element={<CrearHabitacion />} /> 
        <Route path="/crear-persona" element={<CrearPersona/>} />
        <Route path="/editar-persona/:id" element={<ActualizarPersona />} />
      </Routes>
    </div>
  );
};

export default App;
