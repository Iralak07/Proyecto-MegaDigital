import React, { useState, useEffect } from 'react';
import { createReserva, updateReserva } from '../services/reservaService';
import Modal from './Modal';
import '../estilos/ReservaForm.css';
import axios from 'axios';

const ReservaForm = ({ reserva, onSave }) => {
    const [formData, setFormData] = useState({
        fechaentrada: reserva ? reserva.fechaentrada : '',
        fechasalida: reserva ? reserva.fechasalida : '',
        habitacionid: reserva ? reserva.habitacionid : '',
        personaid: reserva ? reserva.personaid : '',
    });

    const [habitaciones, setHabitaciones] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchHabitaciones();
        fetchPersonas();
    }, []);

    const fetchHabitaciones = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/habitaciones');
            setHabitaciones(response.data);
        } catch (error) {
            console.error('Error al obtener habitaciones disponibles:', error);
        }
    };

    const fetchPersonas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/personas');
            setPersonas(response.data);
        } catch (error) {
            console.error('Error al obtener personas:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');

        try {
            if (reserva) {
                await updateReserva(reserva.id, formData);
            } else {
                await createReserva(formData);
            }
            onSave(); // Actualizar la lista de reservas
        } catch (error) {
            console.error('Error al guardar la reserva:', error);
            setError('La habitación no está disponible en el rango de fechas seleccionado.');
            setIsModalOpen(true); // Mostrar el modal con el mensaje de error
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="form-container">
            <Modal isOpen={isModalOpen} onClose={closeModal} message={error} />
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <h2 className="form-title">{reserva ? 'Editar Reserva' : 'Crear Reserva'}</h2>
                    <div className="form-group">
                        <label>Fecha de Entrada:</label>
                        <input
                            type="date"
                            name="fechaentrada"
                            value={formData.fechaentrada}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Fecha de Salida:</label>
                        <input
                            type="date"
                            name="fechasalida"
                            value={formData.fechasalida}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Habitación:</label>
                        <select
                            name="habitacionid"
                            value={formData.habitacionid}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione una habitación</option>
                            {habitaciones.map((habitacion) => (
                                <option key={habitacion.id} value={habitacion.id}>
                                      {`Habitacion No.${habitacion.habitacionnro}`} - {`Piso No. ${habitacion.habitacionpiso}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Persona:</label>
                        <select
                            name="personaid"
                            value={formData.personaid}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione una persona</option>
                            {personas.map((persona) => (
                                <option key={persona.id} value={persona.id}>
                                    {persona.nombrecompleto} - {persona.nrodocumento}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="form-button">
                        {reserva ? 'Actualizar' : 'Crear'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReservaForm;
