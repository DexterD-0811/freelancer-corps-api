import express from 'express';
import {
  createReport,
  getAllReports,
  getReportByID,
  updateReportByID,
  deleteReportByID,
} from './controller.js';

import {
  verifyToken,
  authorizeAdmin,
  authorizeUser
} from '../auth/middleware.js'
import { validateReportInput } from './middleware.js';

const router = express.Router();

router.post('/', verifyToken, authorizeAdmin, validateReportInput, createReport);
router.get('/', getAllReports);
router.get('/:reportID', getReportByID);
router.patch('/:reportID', verifyToken, authorizeUser, updateReportByID);
router.delete('/:reportID', verifyToken, authorizeAdmin, deleteReportByID);

export default router;