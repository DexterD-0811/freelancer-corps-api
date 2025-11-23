import { compare } from 'bcrypt';
import { User } from '../users/model.js';
import { verify } from '../JWT/jwt-service.js'

export async function authenticate(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
   
    if (!user) {
      return res.status(400).json({ 
        error: 'Invalid credentials' });
    }

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 
        'Invalid credentials' });
    }

    req.authenticatedUser = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 
      'Internal server error' });
  }
}

export function authorizeAdmin(req, res, next) {
  if (req.authenticatedUser.role !== 'admin') {
    return res.status(403).json({ error: 
      'Forbidden: Admin only' });
  }
  next();
}

export function authorizeUser(req, res, next) {
  if (!['admin', 'user'].includes(req.authenticatedUser.role)) {
    return res.status(403).json({ 
      error: 'Forbidden: Users or Admins only' });
  }
  next();
}

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token);
    req.authenticatedUser = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ 
      error: 'Invalid token' });
  }
}
