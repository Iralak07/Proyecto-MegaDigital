import { obtenerPersonas, obtenerPersonaPorId, crearPersona, actualizarPersona, eliminarPersona } from '../controllers/persona';
import { validarPersona } from '../middleware/validarPersona';
import { Router } from 'express';

const router = Router();

router.get('/personas', obtenerPersonas);
router.get('/personas/:id', obtenerPersonaPorId);
router.post('/personas', validarPersona,crearPersona);
router.patch('/personas/:id', validarPersona, actualizarPersona);
router.delete('/personas/:id', eliminarPersona);

export default router;