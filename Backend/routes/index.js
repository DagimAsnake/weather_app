import express from 'express';
import authRoutes from './auth.js';

const rootRouter = express.Router();

rootRouter.use('/auth', authRoutes);

export default rootRouter;
