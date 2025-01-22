import express from 'express';
import {
  addToFavourites,
  getFavourites,
  removeFavourites,
} from '../controllers/favourite.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const favouriteRoutes = express.Router();

favouriteRoutes.post('/', isLoggedIn, addToFavourites);
favouriteRoutes.get('/', isLoggedIn, getFavourites);
favouriteRoutes.delete('/', isLoggedIn, removeFavourites);

export default favouriteRoutes;
