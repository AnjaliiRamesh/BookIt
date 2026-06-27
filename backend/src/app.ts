import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import eventRoutes from './routes/event.routes'; // Import our new event routes

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Router Registries
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/events', eventRoutes); // Register event routes at /api/v1/events

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 BOOKIT Engine safely running on port ${PORT}`);
});