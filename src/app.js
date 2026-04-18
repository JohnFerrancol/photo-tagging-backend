import express from 'express';
import cors from 'cors';

import errorHandler from './middleware/errors.middleware.js';

import gamesRouter from './routes/games.routes.js';

const app = express();

// Parse incoming POST request data to be converted into a useable JS object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up CORS for the local React app as well as the deployed Vercel App
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://photo-tagging-frontend.app'],
  })
);

app.use('/api/v1/games', gamesRouter);

app.use(errorHandler);

export default app;
