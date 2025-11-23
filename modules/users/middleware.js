import { User } from './model.js';  // Adjust path as needed

export async function validateNewUser(req, res, next) {
  try {
    const { username, password, role, profile } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Username and password are required' 
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ 
        error: 'Username already exists' 
      });
    }

    next();

  } catch (error) {
    console.error('validateNewUser error:', error);
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}
