

import express, { Application, Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import 'dotenv/config';



import { rateLimit } from 'express-rate-limit';




// routes
import router from './modules/surah/surah.routes';
import { errorHandler } from './middleware/errorHandler';


const app: Application = express();

const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET'],
//   credentials: true
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "Too many requests from this IP, please try again after 15 minutes"
});

app.use(limiter);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// 1. Security Headers
app.use(cors(corsOptions));


// 3. Prevent HTTP Parameter Pollution
app.use(limiter);

// Routes
app.use('/api/v1', router);



app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: "Welcome to our Quran API! Explore the beauty of the Quran with us."
  });
});

// unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    status: false,
    error: 'Route not found' 
  });
});

// global error handler
app.use(errorHandler);


export default app;