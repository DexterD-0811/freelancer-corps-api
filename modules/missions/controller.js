import { Mission } from './model.js';
import { User } from '../users/model.js';
import { Demon } from '../demons/model.js';

//CREAT A NEW MISSION
export async function createMission(req, res) {
  try {
    const { title, description, difficulty, demonID, assignedTo, status, expReward } = req.body;

    const demon = await Demon.findOne({ demonID });

    const mission = new Mission({
      title,
      description,
      difficulty,
      demonID,
      targetDemon: demon.name,
      assignedTo,
      status: status || "pending",
      expReward,
    });

    await mission.save();

    res.status(201).json({ message: 'Mission created', mission });
  } catch (error) {
    console.error('createMission error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Get all missions
export async function getAllMissions(req, res) {
  try {
    const missions = await Mission.find({});
    res.status(200).json({ missions });
  } catch (error) {
    console.error('getAllMissions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}


// Get a single mission by missionID
export async function getMissionByID(req, res) {
  try {
    const { missionID } = req.params;

    const mission = await Mission.findOne({ missionID });

    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }

    res.status(200).json({ mission });
  } catch (error) {
    console.error('getMissionByID error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Delete a mission by missionID
export async function deleteMissionByID(req, res) {
  try {
    const { missionID } = req.params;

    const deletedMission = await Mission.findOneAndDelete({ missionID });

    if (!deletedMission) {
      return res.status(404).json({ error: 'Mission not found' });
    }

    res.status(200).json({ message: `Mission ${missionID} deleted successfully` });
  } catch (error) {
    console.error('deleteMissionByID error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function updateMissionByID(req, res) {
  try {
    const { missionID } = req.params;
    const updateData = req.body;

    if (updateData.missionID) delete updateData.missionID;

    const mission = await Mission.findOne({ missionID });
    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }

    Object.assign(mission, updateData);

    await mission.save();

    res.status(200).json({
      message: 'Mission updated successfully',
      mission,
    });
  } catch (error) {
    console.error('updateMissionByID error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
