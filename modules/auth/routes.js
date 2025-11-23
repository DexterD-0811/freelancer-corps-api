import { Router } from 'express';
import { login } from './controller.js';
import { authenticate, authorizeAdmin, authorizeUser, verifyToken } from './middleware.js';


const router = new Router();

router.post('/login', authenticate, login);

router.get('/admin', verifyToken, authorizeAdmin, (req, res) => {
  res.json({ 
    message: 'Welcome Admin', user: req.authenticatedUser 
  });
});

router.get('/user', verifyToken, authorizeUser, (req, res) => {
  res.json({ 
    message: 'Welcome User', user: req.authenticatedUser 
  });
});

export default router;