import db from '../db';
import { RowDataPacket } from 'mysql2';

export const validarDatosHabitacion = (
    habitacionpiso: number,
    habitacionnro: number,
    cantcamas: number
): { valido: boolean; mensaje?: string } => {
    if (!Number.isInteger(habitacionpiso) || habitacionpiso <= 0 || habitacionpiso > 10) {
        return { valido: false, mensaje: 'El piso debe ser un número entero entre 1 y 10' };
    }

    if (!Number.isInteger(habitacionnro) || habitacionnro <= 0 || habitacionnro > 20) {
        return { valido: false, mensaje: 'El número de habitación debe ser un número entero entre 1 y 20' };
    }

    if (!Number.isInteger(cantcamas) || cantcamas < 1 || cantcamas > 4) {
        return { valido: false, mensaje: 'La cantidad de camas debe ser un número entero entre 1 y 4' };
    }

    return { valido: true };
};

export const existeHabitacion = async (
    habitacionpiso: number,
    habitacionnro: number
): Promise<boolean> => {
    const query = 'SELECT id FROM habitacion WHERE habitacionpiso = ? AND habitacionnro = ? LIMIT 1';
    const [result]: [RowDataPacket[], any] = await db.query(query, [habitacionpiso, habitacionnro]);
    return result.length > 0;
};

export const existeHabitacionPorId = async (id: number): Promise<boolean> => {
    const query = 'SELECT id FROM habitacion WHERE id = ? LIMIT 1';
    const [result]: [RowDataPacket[], any] = await db.query(query, [id]);
    return result.length > 0;
};

export const obtenerHabitacionId = async (id: number): Promise<any> => {
    const query = 'SELECT * FROM habitacion WHERE id = ?';
    const [result]: any = await db.query(query, [id]);
    return result;
};