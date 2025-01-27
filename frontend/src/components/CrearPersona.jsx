import React, { useState } from 'react';
import axios from 'axios';
import ObtenerPersonas from './ObtenerPersonas';
import '../estilos/CrearPersona.css';

const CrearPersona = () => {
  const [formData, setFormData] = useState({
    nombrecompleto: '',
    nrodocumento: '',
    correo: '',
    telefono: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/personas', formData);
      setMensaje(response.data.message);
      setFormData({
        nombrecompleto: '',
        nrodocumento: '',
        correo: '',
        telefono: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear la persona');
    }
  };

  return (
    <div className="container">
      <h2>Crear Persona</h2>
      {mensaje && <p className="success-message">{mensaje}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombrecompleto">Nombre Completo:</label>
          <input
            type="text"
            id="nombrecompleto"
            name="nombrecompleto"
            value={formData.nombrecompleto}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="nrodocumento">Número de Documento:</label>
          <input
            type="text"
            id="nrodocumento"
            name="nrodocumento"
            value={formData.nrodocumento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Persona</button>
      </form>
      <ObtenerPersonas />
    </div>
  );
};

export default CrearPersona;
