import { obtenerPersonas, obtenerPersonaPorId, crearPersona, actualizarPersona, eliminarPersona } from '../controllers/persona';
import { Router } from 'express';

const router = Router();

router.get('/personas', obtenerPersonas);
router.get('/personas/:id', obtenerPersonaPorId);
router.post('/personas', crearPersona);
router.patch('/personas/:id', actualizarPersona);
router.delete('/personas/:id', eliminarPersona);

export default router;