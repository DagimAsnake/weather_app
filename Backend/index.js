import express from 'express';
import cors from 'cors';
import { PORT } from './secret.js';
import rootRouter from './routes/index.js';
import dbConnect from './config/dbConnect.js';
import { notFound, globalErrhandler } from './middlewares/globalErrHandler.js';

//DB connect
dbConnect();
const app = express();

app.use(cors());
app.use(express.json());

// Main routes
app.use('/api', rootRouter);

//err middleware
app.use(notFound);
app.use(globalErrhandler);

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});