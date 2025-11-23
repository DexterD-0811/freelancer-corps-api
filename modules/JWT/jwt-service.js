import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../auth/config.js';

export function sign(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

export function verify(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}