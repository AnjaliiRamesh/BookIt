import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Universal Processing Middlewares
app.use(cors());
app.use(express.json());

// Server Health Validation Probe
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 BOOKIT Engine safely running on port ${PORT}`);
});