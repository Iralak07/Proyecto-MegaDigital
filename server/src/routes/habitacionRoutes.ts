import { obtenerHabitacionPorId, obtenerHabitaciones, crearHabitacion, actualizarHabitacion, eliminarHabitacion } from "../controllers/habitacion.controllers";
import { validarHabitacion } from "../middleware/validarHabitacion";
import { Router } from "express";

const router = Router();

router.get('/habitaciones', obtenerHabitaciones);
router.get('/habitaciones/:id', obtenerHabitacionPorId);
router.post('/habitaciones', validarHabitacion,crearHabitacion);
router.patch('/habitaciones/:id', validarHabitacion,actualizarHabitacion);
router.delete('/habitaciones/:id', eliminarHabitacion);

export default router;