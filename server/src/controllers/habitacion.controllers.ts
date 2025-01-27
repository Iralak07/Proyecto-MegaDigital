import { Request, Response } from 'express';
import db from '../db';
import { Habitacion } from '../models/habitacion';

export const obtenerHabitaciones = async (req: Request, res: Response): Promise<void> => {
    //#swagger.tags = ['Habitaciones']
    //#swagger.description = 'Obtener Habitaciones'
    try {
        const query = `SELECT * FROM habitacion`;
        const [rows]: [any[], any] = await db.query(query);
        console.log(rows)
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener habitaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const obtenerHabitacionPorId = async (req: Request, res: Response): Promise<void> => {
    //#swagger.tags = ['Habitaciones']
    //#swagger.description = 'Obtener Habitaciones por id'
    /*#swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la habitacion',
        required: true,
        type: 'number'
    }
    */
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: 'El ID proporcionado no es válido' });
        return;
    }

    try {
        const query = `SELECT * FROM habitacion WHERE id = ?`;
        const [rows]: [any[], any] = await db.query(query, [id]);

        if (rows.length === 0) {
            res.status(404).json({ error: 'Habitación no encontrada' });
            return;
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener habitación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



export const crearHabitacion = async (req: Request, res: Response): Promise<void> => {
    //#swagger.tags = ['Habitaciones']
    //#swagger.description = 'Crear Habitaciones'
    const { habitacionpiso, habitacionnro, cantcamas, tienetelevision, tienefrigobar } = req.body;

    if (!habitacionpiso || !habitacionnro || !cantcamas) {
        res.status(400).json({ error: 'Los campos habitacionpiso, habitacionnro y cantcamas son obligatorios' });
        return;
    }

    try {
        const query = `
            INSERT INTO habitacion (habitacionpiso, habitacionnro, cantcamas, tienetelevision, tienefrigobar)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result]: any = await db.query(query, [
            habitacionpiso,
            habitacionnro,
            cantcamas,
            tienetelevision || false,
            tienefrigobar || false,
        ]);

        res.status(201).json({
            message: 'Habitación creada exitosamente',
            id: result.insertId,
        });
    } catch (error) {
        console.error('Error al crear habitación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const actualizarHabitacion = async (req: Request, res: Response): Promise<void> => {
    //#swagger.tags = ['Habitaciones']
    //#swagger.description = 'Actualizar Habitaciones'
    const { id } = req.params;
    const { habitacionpiso, habitacionnro, cantcamas, tienetelevision, tienefrigobar } = req.body;

    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: 'El ID proporcionado no es válido' });
        return;
    }

    if (!habitacionpiso && !habitacionnro && !cantcamas && tienetelevision === undefined && tienefrigobar === undefined) {
        res.status(400).json({ error: 'Debes proporcionar al menos un campo para actualizar' });
        return;
    }

    try {
        const query = `
            UPDATE habitacion
            SET habitacionpiso = ?, habitacionnro = ?, cantcamas = ?, tienetelevision = ?, tienefrigobar = ?
            WHERE id = ?
        `;
        const [result]: any = await db.query(query, [
            habitacionpiso || null,
            habitacionnro || null,
            cantcamas || null,
            tienetelevision || false,
            tienefrigobar || false,
            id,
        ]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Habitación no encontrada' });
            return;
        }

        res.json({ message: 'Habitación actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar habitación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const eliminarHabitacion = async (req: Request, res: Response): Promise<void> => {
    //#swagger.tags = ['Habitaciones']
    //#swagger.description = 'Eliminar Habitaciones'
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: 'El ID proporcionado no es válido' });
        return;
    }

    try {
        const query = `DELETE FROM habitacion WHERE id = ?`;
        const [result]: any = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Habitación no encontrada' });
            return;
        }

        res.json({ message: 'Habitación eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar habitación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};