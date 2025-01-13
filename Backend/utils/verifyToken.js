import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secret.js';

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Error verifying token:', error.message);
    throw new Error('Invalid or expired token');
  }
};
