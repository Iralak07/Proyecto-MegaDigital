import { Request, Response, NextFunction } from 'express';
import { existePersona, existeHabitacion, habitacionDisponible, obtenerReservaPorId, validarFechaEntrada } from '../services/reserva.services';

export const validarReserva = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { personaid, habitacionid, fechaentrada, fechasalida } = req.body;

    if (personaid && !(await existePersona(personaid))) {
        res.status(404).json({ error: 'Persona no encontrada' });
        return;
    }

    if (habitacionid && !(await existeHabitacion(habitacionid))) {
        res.status(404).json({ error: 'Habitación no encontrada' });
        return;
    }

    if (!validarFechaEntrada(new Date(fechaentrada))) {
        res.status(400).json({ error: 'La fecha de entrada debe ser posterior al día actual' });
        return;
    }

    if (fechaentrada && fechasalida && habitacionid) {
        if (!(await habitacionDisponible(habitacionid, new Date(fechaentrada), new Date(fechasalida)))) {
            res.status(409).json({ error: 'La habitación no está disponible en el rango de fechas seleccionado' });
            return;
        }
    }

    next();
};

export const validarReservaExistente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: 'El ID proporcionado no es válido' });
        return;
    }

    const reserva = await obtenerReservaPorId(Number(id));
    if (!reserva) {
        res.status(404).json({ error: 'Reserva no encontrada' });
        return;
    }

    next();
};