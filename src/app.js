import express from 'express';
import cors from 'cors';

import errorHandler from './middleware/errors.middleware.js';

import indexRouter from './routes/index.routes.js';
import apiRouter from './routes/api.routes.js';

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

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
