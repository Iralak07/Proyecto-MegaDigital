import { obtenerPersonas, obtenerPersonaPorId } from '../controllers/persona';
import { Router } from 'express';

const router = Router();

router.get('/personas', obtenerPersonas);
router.get('/personas/:id', obtenerPersonaPorId);


export default router;