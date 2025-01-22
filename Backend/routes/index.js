import express from 'express';
import authRoutes from './auth.js';
import favouriteRoutes from './favourite.js';

const rootRouter = express.Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/favourite', favouriteRoutes);

export default rootRouter;
