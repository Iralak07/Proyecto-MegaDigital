// services/reserva.services.ts
import db from '../db';
import { RowDataPacket } from 'mysql2';

export const habitacionDisponible = async (habitacionid: number,fechaentrada: Date,fechasalida: Date): Promise<boolean> => {
    const query = `
        SELECT id FROM reserva
        WHERE habitacionid = ?
        AND (
            (fechaentrada BETWEEN ? AND ?) OR
            (fechasalida BETWEEN ? AND ?) OR
            (fechaentrada <= ? AND fechasalida >= ?)
        )
        LIMIT 1
    `;
    const [rows]: [RowDataPacket[], any] = await db.query(query, [habitacionid,fechaentrada,fechasalida,fechaentrada,fechasalida,
        fechaentrada,
        fechasalida,
    ]);
    return rows.length === 0;
};

export const calcularMontoReserva = (fechaentrada: Date, fechasalida: Date): number => {
    const diferenciaMs = fechasalida.getTime() - fechaentrada.getTime();
    const dias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
    return dias * 120000;
};

export const existePersona = async (personaid: number): Promise<boolean> => {
    const query = 'SELECT id FROM persona WHERE id = ? LIMIT 1';
    const [rows]: [RowDataPacket[], any] = await db.query(query, [personaid]);
    return rows.length > 0;
};

export const existeHabitacion = async (habitacionid: number): Promise<boolean> => {
    const query = 'SELECT id FROM habitacion WHERE id = ? LIMIT 1';
    const [rows]: [RowDataPacket[], any] = await db.query(query, [habitacionid]);
    return rows.length > 0;
};

export const obtenerReservaPorId = async (id: number): Promise<any> => {
    const query = 'SELECT * FROM reserva WHERE id = ? LIMIT 1';
    const [rows]: [RowDataPacket[], any] = await db.query(query, [id]);
    return rows[0];
};

export const validarFechaEntrada = (fecha: Date): boolean => {
    const fechaEntrada = new Date(fecha);
    const hoy = new Date();

    fechaEntrada.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);

    return fechaEntrada > hoy;
};