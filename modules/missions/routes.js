import express from 'express';
import {
  createMission,
  getAllMissions,
  getMissionByID,
  updateMissionByID,
  deleteMissionByID,
} from './controller.js';
import {
  verifyToken,
  authorizeAdmin,
  authorizeUser
} from '../auth/middleware.js'
import {
  validateAssignedTo,
  validateDemonID
} from './middleware.js'

const router = express.Router();

router.post('/', verifyToken, authorizeAdmin, validateAssignedTo, validateDemonID, createMission);
router.get('/', getAllMissions);
router.get('/:missionID', getMissionByID);
router.patch('/:missionID', verifyToken, authorizeUser, updateMissionByID);
router.delete('/:missionID', verifyToken, authorizeAdmin, deleteMissionByID);

export default router;
