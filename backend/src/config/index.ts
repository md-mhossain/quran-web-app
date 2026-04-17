import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
  DATA_URL: process.env.DATA_URL || '',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 8000
};