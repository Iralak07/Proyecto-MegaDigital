import { obtenerReservas, obtenerReservaPorIdController, crearReserva, actualizarReserva, eliminarReserva } from "../controllers/reserva.controllers";
import { validarReserva, validarReservaExistente } from "../middleware/reservaMiddleware";
import { Router } from "express";

const router = Router();


router.get('/reservas', obtenerReservas);
router.post('/reservas', validarReserva, crearReserva);
router.get('/reservas/:id', obtenerReservaPorIdController);
router.patch('/reservas/:id', validarReservaExistente,actualizarReserva);
router.delete('/reservas/:id', validarReservaExistente, eliminarReserva);

export default router;


