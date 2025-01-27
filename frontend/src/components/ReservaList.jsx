import React, { useEffect, useState } from 'react';
import { getReservas, deleteReserva } from '../services/reservaService';
import '../estilos/ReservaList.css'; // Importamos los estilos CSS

const ReservaList = ({ refresh }) => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        fetchReservas();
    }, [refresh]); // Dependencia: se ejecuta cuando `refresh` cambia

    const fetchReservas = async () => {
        try {
            const data = await getReservas();
            setReservas(data);
        } catch (error) {
            console.error('Error al obtener las reservas:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteReserva(id);
            fetchReservas(); // Actualizar la lista después de eliminar
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
        }
    };

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        return new Intl.DateTimeFormat('en-CA').format(date); // Formato YYYY-MM-DD
    };

    return (
        <div className="list-container">
            <h2 className="list-title">Lista de Reservas</h2>
            {reservas.length === 0 ? (
                <p className="no-reservas">No hay reservas disponibles.</p>
            ) : (
                <ul className="reserva-list">
                    {reservas.map((reserva) => (
                        <li key={reserva.id} className="reserva-item">
                            <div className="reserva-info">
                                <span>
                                    {formatFecha(reserva.fechaentrada)} - {formatFecha(reserva.fechasalida)}
                                </span>
                                <span>(Habitación: {reserva.habitacionid} - Persona: {reserva.personaid})</span>
                            </div>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(reserva.id)}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReservaList;
