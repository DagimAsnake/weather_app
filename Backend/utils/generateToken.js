import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secret.js';

export const generateToken = (id, role) => {
  try {
    return jwt.sign({ id, role }, JWT_SECRET);
  } catch (error) {
    console.error('Error generating token:', error.message);
    throw new Error('Token generation failed');
  }
};
