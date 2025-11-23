import { Demon } from './model.js';

export async function validateNewDemon(req, res, next) {
  try {
    const { name, type, rank, status } = req.body;

    if (!name || !type || !rank || !status) {
      return res.status(400).json({
        error: 'Missing required demon fields: name, type, rank, and status are required'
      });
    }

    const existingDemon = await Demon.findOne({ name });
    if (existingDemon) {
      return res.status(409).json({ error: 'Demon already exists' });
    }

    next();
  } catch (error) {
    res.status(500).json({
      error: 'Validation error',
      details: error.message
    });
  }
}
