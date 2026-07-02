import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use('/api', apiRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`MealMind AI server listening on port ${port}`);
});
