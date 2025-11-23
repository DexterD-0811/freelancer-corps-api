import express from 'express';
import { createDemon, 
  getDemonByID, 
  updateDemonByID, 
  deleteDemonByID,
getAllDemons } from './controller.js';
import {
  authorizeAdmin,
  verifyToken,
} from '../auth/middleware.js'
import { validateNewDemon } from './middleware.js';


const router = express.Router();

router.post('/', verifyToken, authorizeAdmin, validateNewDemon, createDemon);
router.get('/', getAllDemons);
router.get('/:demonID', getDemonByID);
router.patch('/:demonID', verifyToken, authorizeAdmin, updateDemonByID);
router.delete('/:demonID', verifyToken, authorizeAdmin, deleteDemonByID);

export default router;