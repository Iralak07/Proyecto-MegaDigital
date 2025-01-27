import { Request, Response, NextFunction } from 'express';
import { validarDatosHabitacion, existeHabitacion, existeHabitacionPorId, obtenerHabitacionId } from '../services/habitacion.services';

export const validarHabitacion = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { habitacionpiso, habitacionnro, cantcamas } = req.body;

    const validacion = validarDatosHabitacion(habitacionpiso, habitacionnro, cantcamas);
    if (!validacion.valido) {
        res.status(400).json({ error: validacion.mensaje });
        return;
    }

    if (req.method === 'POST') {
        const habitacionExiste = await existeHabitacion(habitacionpiso, habitacionnro);
        if (habitacionExiste) {
            res.status(409).json({ error: 'La habitación ya existe' });
            return;
        }
    }

    if (req.method === 'PATCH' || req.method === 'DELETE') {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            res.status(400).json({ error: 'El ID proporcionado no es válido' });
            return;
        }

        const habitacionExiste = await existeHabitacionPorId(Number(id));
        if (!habitacionExiste) {
            res.status(404).json({ error: 'Habitación no encontrada' });
            return;
        }
    }

    if (req.method === 'PATCH' && habitacionpiso && habitacionnro) {
        const { id } = req.params;
        const habitacionId = await obtenerHabitacionId(Number(id));

        if(habitacionId[0].id !== Number(id)) {
            const habitacionExiste = await existeHabitacion(habitacionpiso, habitacionnro);

            if (habitacionExiste) {
                res.status(409).json({ error: 'Ya existe una habitación con ese número de piso y número de habitación' });
                return;
            }   
        }
        if(habitacionId[0].habitacionpiso !== habitacionpiso || habitacionId[0].habitacionnro !== habitacionnro) {
            const habitacionExiste = await existeHabitacion(habitacionpiso, habitacionnro);

            if (habitacionExiste) {
                res.status(409).json({ error: 'Ya existe una habitación con ese número de piso y número de habitación' });
                return;
            }
        }
    }

    next();
};