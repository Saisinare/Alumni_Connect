import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: '*', credentials: false }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'alumni-platform-backend', time: new Date().toISOString() });
});

app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;


