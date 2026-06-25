
import * as dotenv from 'dotenv';
dotenv.config();


import express, { Request, Response, Application } from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import { authenticateToken, AuthenticatedRequest } from './middlewares/auth.middleware';


const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount Authentication Routing Subsystem
app.use('/api/v1/auth', authRoutes);

// Base Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// A Protected Test Profile Route to verify our Auth Middleware works perfectly
app.get('/api/v1/auth/me', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ message: "Access Authorized", identity: req.user });
});

app.listen(PORT, () => {
  console.log(`🚀 BOOKIT Engine safely running on port ${PORT}`);
});