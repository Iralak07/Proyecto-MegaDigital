// controllers/reserva.controllers.ts
import { Request, Response } from 'express';
import db from '../db';
import { calcularMontoReserva, obtenerReservaPorId } from '../services/reserva.services';

// Obtener todas las reservas
export const obtenerReservas = async (req: Request, res: Response): Promise<void> => {
    /* 
    #swagger.tags = ['Reservas']
    #swagger.description = 'Obtener reservas realizadas'  
    */
    try {
        const query = 'SELECT * FROM reserva';
        const [rows]: [any[], any] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener una reserva por ID
export const obtenerReservaPorIdController = async (req: Request, res: Response): Promise<void> => {
    /* 
    #swagger.tags = ['Reservas']
    #swagger.description = 'Obtiene una reserva especificada por la Id'  
    */
    const { id } = req.params;

    try {
        const reserva = await obtenerReservaPorId(Number(id));
        if (!reserva) {
            res.status(404).json({ error: 'Reserva no encontrada' });
            return;
        }

        res.json(reserva);
    } catch (error) {
        console.error('Error al obtener reserva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear una nueva reserva
export const crearReserva = async (req: Request, res: Response): Promise<void> => {
        /* 
    #swagger.tags = ['Reservas']
    #swagger.description = 'Crea una reserva'  
    */
    const { fechaentrada, fechasalida, habitacionid, personaid } = req.body;

    try {
        // Calcular el monto de la reserva
        const montoreserva = calcularMontoReserva(new Date(fechaentrada), new Date(fechasalida));

        // Insertar la reserva en la base de datos
        const query = `
            INSERT INTO reserva (fechareserva, fechaentrada, fechasalida, habitacionid, personaid, montoreserva)
            VALUES (NOW(), ?, ?, ?, ?, ?)
        `;
        const [result]: any = await db.query(query, [
            fechaentrada,
            fechasalida,
            habitacionid,
            personaid,
            montoreserva,
        ]);

        res.status(201).json({
            message: 'Reserva creada exitosamente',
            id: result.insertId,
        });
    } catch (error) {
        console.error('Error al crear reserva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar una reserva
export const actualizarReserva = async (req: Request, res: Response): Promise<void> => {
        /* 
    #swagger.tags = ['Reservas']
    #swagger.description = 'Actualiza una reserva ya hecha'  
    */
    const { id } = req.params;
    const { fechaentrada, fechasalida, habitacionid, personaid } = req.body;

    try {
        const reserva = await obtenerReservaPorId(Number(id));
        if (!reserva) {
            res.status(404).json({ error: 'Reserva no encontrada' });
            return;
        }

        // Calcular el nuevo monto de la reserva si las fechas cambian
        const montoreserva = fechaentrada || fechasalida
            ? calcularMontoReserva(
                  new Date(fechaentrada || reserva.fechaentrada),
                  new Date(fechasalida || reserva.fechasalida)
              )
            : reserva.montoreserva;

        // Actualizar la reserva
        const queryUpdate = `
            UPDATE reserva
            SET fechaentrada = ?, fechasalida = ?, habitacionid = ?, personaid = ?, montoreserva = ?
            WHERE id = ?
        `;
        await db.query(queryUpdate, [
            fechaentrada || reserva.fechaentrada,
            fechasalida || reserva.fechasalida,
            habitacionid || reserva.habitacionid,
            personaid || reserva.personaid,
            montoreserva,
            id,
        ]);

        res.json({ message: 'Reserva actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar reserva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar una reserva
export const eliminarReserva = async (req: Request, res: Response): Promise<void> => {
    /* 
    #swagger.tags = ['Reservas']
    #swagger.description = 'Elimina una reserva existente'  
    */
    const { id } = req.params;

    try {
        const query = 'DELETE FROM reserva WHERE id = ?';
        const [result]: any = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Reserva no encontrada' });
            return;
        }

        res.json({ message: 'Reserva eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar reserva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};