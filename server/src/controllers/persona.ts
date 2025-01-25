import { Persona } from '../models/persona';
import db from '../db';
import { Request, Response } from 'express';


export const obtenerPersonas = async (req: Request, res: Response): Promise<void> => {
    // #swagger.tags = ['Personas']
    // #swagger.description = 'Obtener Personas'
    try {
        const query = `SELECT id, nombrecompleto, nrodocumento, correo, telefono FROM persona`;
        
        const [rows]: [any[], any] = await db.query(query); 
        
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener personas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener una persona por ID
export const obtenerPersonaPorId = async (req: Request, res: Response): Promise<void> => {
    // #swagger.tags = ['Personas']
    // #swagger.description = 'Obtener Personas por id'
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: 'El ID proporcionado no es válido' });
        return;
    }

    try {
        const query = `SELECT id, nombrecompleto, nrodocumento, correo, telefono FROM persona WHERE id = ?`;
        
        const [rows]: [any[], any] = await db.query(query, [id]);

        if (rows.length === 0) {
            res.status(404).json({ error: 'Persona no encontrada' });
            return;
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener persona:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear una nueva persona
export const crearPersona = async (req: Request, res: Response): Promise<void> => {
    /* 	#swagger.tags = ['Personas']
        #swagger.description = 'Crear una nueva persona' */
    const { nombrecompleto, nrodocumento, correo, telefono } = req.body;

    if (!nombrecompleto || !nrodocumento || !correo) {
        res.status(400).json({ error: 'Los campos nombrecompleto, nrodocumento y correo son obligatorios' });
        return;
    }

    try {
        const query = `INSERT INTO persona (nombrecompleto, nrodocumento, correo, telefono) VALUES (?, ?, ?, ?)`;
        const [result]: any = await db.query(query, [nombrecompleto, nrodocumento, correo, telefono || null]);

        res.status(201).json({
            message: 'Persona creada exitosamente',
            id: result.insertId,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar una persona
export const actualizarPersona = async (req: Request, res: Response): Promise<void> => {
    // #swagger.tags = ['Personas']
    // #swagger.description = 'Actualizar los datos de una persona'
    const { id } = req.params;
    const { nombrecompleto, nrodocumento, correo, telefono } = req.body;

    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: 'El ID proporcionado no es válido' });
        return;
    }

    if (!nombrecompleto && !nrodocumento && !correo && !telefono) {
        res.status(400).json({ error: 'Debes proporcionar al menos un campo para actualizar' });
        return;
    }

    try {
        const query = `UPDATE persona SET nombrecompleto = ?, nrodocumento = ?, correo = ?, telefono = ? WHERE id = ?`;
        const [result]: any = await db.query(query, [
            nombrecompleto || null,
            nrodocumento || null,
            correo || null,
            telefono || null,
            id,
        ]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Persona no encontrada' });
            return;
        }

        res.json({ message: 'Persona actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar persona:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar una persona
export const eliminarPersona = async (req: Request, res: Response): Promise<void> => {
    // #swagger.tags = ['Personas']
    // #swagger.description = 'Eliminar a una persona por su id'
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: 'El ID proporcionado no es válido' });
        return;
    }

    try {
        const query = `DELETE FROM persona WHERE id = ?`;
        const [result]: any = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Persona no encontrada' });
            return;
        }

        res.json({ message: 'Persona eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar persona:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
