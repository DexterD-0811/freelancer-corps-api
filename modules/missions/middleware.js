import { User } from '../users/model.js';
import { Demon } from '../demons/model.js';

// Validate that assignedTo username exists
export async function validateAssignedTo(req, res, next) {
  const body = req.body;
  const { assignedTo } = body;
  if (!assignedTo) {
    return res.status(400).json({ error: "'assignedTo' field is required" });
  }
  const user = await User.findOne({ username: assignedTo });
  if (!user) {
    return res.status(400).json({ error: 'Invalid username in assignedTo' });
  }
  next();
}

// Validate demonID exists
export async function validateDemonID(req, res, next) {
  const { demonID } = req.body;
  if (!demonID) {
    return res.status(400).json({ error: "'demonID' field is required" });
  }
  const demon = await Demon.findOne({ demonID });
  if (!demon) {
    return res.status(400).json({ error: 'Invalid demonID' });
  }
  next();
}
