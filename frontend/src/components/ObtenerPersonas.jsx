import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ActualizarPersona from './ActualizarPersona';

const ObtenerPersonas = () => {
  const [personas, setPersonas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/personas');
        setPersonas(response.data);
      } catch (err) {
        setError('Error al obtener las personas');
      }
    };

    fetchPersonas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/personas/${id}`);
      setPersonas(personas.filter(persona => persona.id !== id)); // Actualizar la lista después de eliminar
      alert(response.data.message); // Mostrar mensaje de éxito
    } catch (err) {
      setError('Error al eliminar la persona');
    }
  };

  return (
    <div className="container">
      <h2>Listado de Personas</h2>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Número de Documento</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.nombrecompleto}</td>
              <td>{persona.nrodocumento}</td>
              <td>{persona.correo}</td>
              <td>{persona.telefono}</td>
              <td>
                <Link to={`/editar-persona/${persona.id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleDelete(persona.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ObtenerPersonas;
