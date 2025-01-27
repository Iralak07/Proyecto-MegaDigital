import express from 'express';
import process from 'process';
import cors from 'cors';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

import persona from './routes/persona';
import habitacionRoutes from './routes/habitacionRoutes';
import reservaRoutes from './routes/reservaRoutes';

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.use(cors({
    origin: [
      'http://localhost:3000',
    ]
  }));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/api', persona);
app.use('/api', habitacionRoutes);
app.use('/api', reservaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
