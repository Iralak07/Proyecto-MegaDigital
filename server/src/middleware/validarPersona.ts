import { Request, Response, NextFunction } from 'express';
import { existeCorreo, existeDocumento, existePersona} from '../services/personas.services';

export const validarPersona = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { correo, nrodocumento } = req.body;

    if(req.method === 'PATCH') {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ error: 'El ID proporcionado no es valido' });
            return;
        }
        if (!await existePersona(Number(id))) {
            res.status(404).json({ error: 'Persona no encontrada' });
            return;
        }
    }

    try {
        if (await existeCorreo(correo)) {
            res.status(409).json({ error: 'El correo ya está registrado' });
            return;
        }

        if (await existeDocumento(nrodocumento)) {
            res.status(409).json({ error: 'El documento de identidad ya está registrado' });
            return;
        }

        next();
    } catch (error: any) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
