import express from 'express';
import { createUser, 
  getAllUsers, 
  getUserByID, 
  deleteUser, 
  getAllProfiles, 
  getProfileByUserID, 
  updateProfileByUserID, 
  getUserMissionsByID} from './controller.js';
import {
  authenticate,
  authorizeAdmin,
  authorizeUser,
  verifyToken
} from '../auth/middleware.js';
import { validateNewUser  } from './middleware.js';

const router = express.Router();

router.post('/register', validateNewUser, createUser);
router.get('/', verifyToken, authorizeAdmin, getAllUsers);
router.get('/profile', getAllProfiles);
router.get('/:userID', verifyToken, authorizeAdmin, getUserByID);
router.get('/:userID/profile', getProfileByUserID);
router.patch('/:userID/profile', verifyToken, authorizeUser, updateProfileByUserID);
router.delete('/:userID', verifyToken, authorizeAdmin, deleteUser);
router.get('/:userID/missions', getUserMissionsByID);

export default router;