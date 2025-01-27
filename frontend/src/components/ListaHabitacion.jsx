import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarHabitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/habitaciones');
        setHabitaciones(response.data);
      } catch (err) {
        setError('Error al obtener las habitaciones');
      }
    };

    fetchHabitaciones();
  }, []);

  return (
    <div className="container">
      <h2>Listado de Habitaciones Disponibles</h2>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Piso</th>
            <th>Número de Habitación</th>
            <th>Cantidad de Camas</th>
            <th>¿Tiene Televisión?</th>
            <th>¿Tiene Frigobar?</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((habitacion) => (
            <tr key={habitacion.id}>
              <td>{habitacion.habitacionpiso}</td>
              <td>{habitacion.habitacionnro}</td>
              <td>{habitacion.cantcamas}</td>
              <td>{habitacion.tienetelevision ? 'Sí' : 'No'}</td>
              <td>{habitacion.tienefrigobar ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarHabitaciones;
