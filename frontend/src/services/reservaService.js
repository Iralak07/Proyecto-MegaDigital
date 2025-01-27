import axios from 'axios';

const API_URL = 'http://localhost:3001/api/reservas';

export const getReservas = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createReserva = async (reserva) => {
    const response = await axios.post(API_URL, reserva);
    return response.data;
};

export const updateReserva = async (id, reserva) => {
    const response = await axios.patch(`${API_URL}/${id}`, reserva);
    return response.data;
};

export const deleteReserva = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
