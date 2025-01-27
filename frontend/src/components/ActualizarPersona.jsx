import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ActualizarPersona = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Usamos useNavigate para la navegación

  const [formData, setFormData] = useState({
    nombrecompleto: '',
    nrodocumento: '',
    correo: '',
    telefono: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Traemos los datos de la persona para editar
  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/personas/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError('Error al obtener los datos de la persona');
      }
    };

    fetchPersona();
  }, [id]);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejo del submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const response = await axios.patch(`http://localhost:3001/api/personas/${id}`, formData);
      setMensaje(response.data.message);
      setTimeout(() => {
        navigate('/personas'); // Redirigir a la lista de personas después de la actualización
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar la persona');
    }
  };

  return (
    <div className="container">
      <h2>Actualizar Persona</h2>
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
        <button type="submit">Actualizar Persona</button>
      </form>
    </div>
  );
};

export default ActualizarPersona;
