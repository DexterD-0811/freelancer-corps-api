import { User } from '../users/model.js';
import { Mission } from '../missions/model.js';
import { Demon } from '../demons/model.js';

// Validate report creation input
export async function validateReportInput(req, res, next) {
  const {
    reportTitle,
    missionID,
    demonID,
    userID,
    content,
    result
  } = req.body;

  if (!reportTitle || !userID || !content || !result) {
    return res.status(400).json({
      error: 'Missing required fields: reportTitle, userID, content, or result.'
    });
  }

  if (!['Success', 'Failure'].includes(result)) {
    return res.status(400).json({
      error: 'Result must be either "Success" or "Failure".'
    });
  }

  const user = await User.findOne({ userID });
  if (!user) {
    return res.status(400).json({ error: 'Invalid userID' });
  }

  req.validatedUser = user;

  if (missionID) {
    const mission = await Mission.findOne({ missionID });
    if (!mission) {
      return res.status(400).json({ error: 'Invalid missionID' });
    }
    req.validatedMission = mission;
  }

  if (demonID) {
    const demon = await Demon.findOne({ demonID });
    if (!demon) {
      return res.status(400).json({ error: 'Invalid demonID' });
    }
    req.validatedDemon = demon;
  }

  next();
}
