import { User } from './model.js';
import { Mission } from '../missions/model.js';
import bcrypt from 'bcrypt';

// CREATE ADMIN
export async function createUserbyAdmin(req, res) {
  try {
    const { username, password, profile } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: 'admin' || 'user',
      profile,
    });

    await newUser.save();

    res.status(201).json({
      message: `${newUser.username} created successfully.`,
      user: {
        userID: newUser.userID,
        username: newUser.username,
        role: newUser.role,
        profile: newUser.profile,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}


// CREATE A USER
export async function createUser(req, res) {
  try {
    const { username, password, profile } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: 'user',
      profile,
    });

    await newUser.save();

    res.status(201).json({
      message: `${newUser.username} created successfully.`,
      user: {
        userID: newUser.userID,
        username: newUser.username,
        role: newUser.role,
        profile: newUser.profile,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}


// GET ALL USERS
export async function getAllUsers(req, res) {
  try {
    const users = await User.find().select('-password');
    const filteredUsers = users.map(user => ({
      userID: user.userID,
      username: user.username,
      role: user.role,
      profile: user.profile
    }));


    res.status(200).json({
      message: 'Successfully got all users.',
      users: filteredUsers
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}

// GET user by ID
export async function getUserByID(req, res) {
  try {
    const user = await User.findOne({ userID: req.params.userID }).select('-password');

    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    const filteredUser = {
      userID: user.userID,
      username: user.username,
      role: user.role,
      profile: user.profile
    };

    res.status(200).json({
      message: 'Successfully got user by ID.',
      user: filteredUser
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}

// DELETE USER INFO
export async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndDelete({ userID: req.params.userID });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 
      'User successfully deleted' 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}

// GET ALL PROFILES FROM ALL USERS
export async function getAllProfiles(req, res) {
  try {
    const users = await User.find({}, 'profile'); // get only profiles
    const allProfiles = users.flatMap(user => user.profile);
    res.status(200).json({
      message: 'Successfully got all profiles from users.',
      profiles: allProfiles
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}

// GET PROFILE BY USERID
export async function getProfileByUserID(req, res) {
  try {
    const { userID } = req.params;

    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = user.profile.length > 0 ? user.profile[0] : null;

    if (!profile) {
      return res.status(404).json({ 
        error: 'Profile not found' 
      });
    }

    res.status(200).json({
      message: 'Successfully got profile by userID.',
      profile
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}

// UPDATE PROFILE BY USERID
export async function updateProfileByUserID(req, res) {
  try {
    const { userID } = req.params;
    const updateData = req.body;

    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(404).json({
         error: 'User not found' 
        });
    }

    if (!user.profile.length) {
      return res.status(404).json({
         error: 'Profile not found' 
        });
    }

    Object.assign(user.profile[0], updateData);

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      profile: user.profile[0]
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}

// GET ALL MISSION BY userID
export async function getUserMissionsByID(req, res) {
  try {
    const { userID } = req.params;

    const user = await User.findOne({ userID: userID });
    if (!user) {
      return res.status(400).json({ 
        error: 'Invalid userID'
      });
    }

    const missions = await Mission.find({ assignedTo: user.username });

    res.status(200).json({
      message: `Missions assigned to ${user.username}`,
      missions
    });
  } catch (error) {
    console.error('Error fetching missions:', error);
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}