import React, { useState } from 'react';
import axios from 'axios';
import ListarHabitaciones from './ListaHabitacion';

const CrearHabitacion = () => {
  const [formData, setFormData] = useState({
    habitacionpiso: '',
    habitacionnro: '',
    cantcamas: '',
    tienetelevision: false,
    tienefrigobar: false,
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    // Convertir los valores a números antes de enviar
    const dataToSend = {
      ...formData,
      habitacionpiso: parseInt(formData.habitacionpiso, 10),  // Asegurarse de que sea un número
      habitacionnro: parseInt(formData.habitacionnro, 10),
      cantcamas: parseInt(formData.cantcamas, 10),
    };

    try {
      const response = await axios.post('http://localhost:3001/api/habitaciones', dataToSend);
      setMensaje(response.data.message);
      setFormData({
        habitacionpiso: '',
        habitacionnro: '',
        cantcamas: '',
        tienetelevision: false,
        tienefrigobar: false,
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear la habitación');
    }
  };

  return (
    <div className="container">
      <h2>Crear Habitación</h2>
      {mensaje && <p className="success-message">{mensaje}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="habitacionpiso">Piso:</label>
          <input
            type="number"
            id="habitacionpiso"
            name="habitacionpiso"
            value={formData.habitacionpiso}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="habitacionnro">Número:</label>
          <input
            type="number"
            id="habitacionnro"
            name="habitacionnro"
            value={formData.habitacionnro}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cantcamas">Cantidad de camas:</label>
          <input
            type="number"
            id="cantcamas"
            name="cantcamas"
            value={formData.cantcamas}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="tienetelevision">
            <input
              type="checkbox"
              id="tienetelevision"
              name="tienetelevision"
              checked={formData.tienetelevision}
              onChange={handleChange}
            />
            ¿Tiene televisión?
          </label>
        </div>
        <div>
          <label htmlFor="tienefrigobar">
            <input
              type="checkbox"
              id="tienefrigobar"
              name="tienefrigobar"
              checked={formData.tienefrigobar}
              onChange={handleChange}
            />
            ¿Tiene frigobar?
          </label>
        </div>
        <button type="submit">Crear Habitación</button>
      </form>
      <ListarHabitaciones />
    </div>
  );
};

export default CrearHabitacion;
