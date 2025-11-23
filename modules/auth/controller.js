import { sign } from '../JWT/jwt-service.js';

export function login(req, res) {
  const { userID, username, role, profile, permissions } = req.authenticatedUser;

  const PAYLOAD = {
    userID,
    username,
    role,
    permissions,
    profile,
  };

  const token = sign(PAYLOAD);

  res.status(200).json({
    token,        
    user: {       
      userID,
      username,
      role,
      permissions,
      profile,
    },
  });
}
