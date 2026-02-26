import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import userRoutes from './modules/users/routes.js';
import demonRoutes from './modules/demons/routes.js';
import missionRoutes from './modules/missions/routes.js';
import authRoutes from './modules/auth/routes.js';
import reportRoutes from './modules/reports/routes.js';
import { swaggerUi, swaggerSpec } from './modules/swagger/swagger.js';


dotenv.config();


const app = express();
const PORT = process.env.PORT ?? 3000;

try {
  await mongoose.connect(process.env.DB_URI);
  console.log('Connected to MongoDB successfully.')
} catch (error) {
  console.error('Unable to connect to database', error);
}

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.set('port', PORT);

app.get('/', (req, res) => {
  res.send({
    message: "Welcome to the Demon Slayer Corps Management System"
  });
});
app.use('/users' ,userRoutes);
app.use('/demons', demonRoutes);
app.use('/missions', missionRoutes);
app.use('/auth', authRoutes);
app.use('/reports', reportRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
