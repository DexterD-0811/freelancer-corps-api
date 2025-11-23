import { Demon } from './model.js'; // Adjust path as needed

// CREATE A DEMON
export async function createDemon(req, res) {
  try {
    const { name, type, rank, status, powerLevel } = req.body;

    const newDemon = new Demon({ name, type, rank, status, powerLevel });
    await newDemon.save();

    res.status(201).json({
      message: `${newDemon.name} created successfully.`,
      demon: newDemon
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
}


// GET ALL DEMONS
export async function getAllDemons(req, res) {
  try {
    const demons = await Demon.find();
    res.status(200).json({
      message: 'Successfully got all demons.',
      demons
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error' });
  }
}

// GET DEMON BY ID
export async function getDemonByID(req, res) {
  try {
    const { demonID } = req.params;
    const demon = await Demon.findOne({ demonID });

    if (!demon) {
      return res.status(404).json({ error: 'Demon not found' });
    }

    res.status(200).json({
      message: 'Demon retrieved successfully',
      demon
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}

// UPDATE DEMON BY ID
export async function updateDemonByID(req, res) {
  try {
    const { demonID } = req.params;
    const updateData = req.body;

    const demon = await Demon.findOneAndUpdate(
      { demonID },
      updateData,
      { new: true }
    );

    if (!demon) {
      return res.status(404).json({ 
        error: 'Demon not found' 
      });
    }

    res.status(200).json({
      message: 'Demon updated successfully',
      demon
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error' });
  }
}

// DELETE DEMON BY ID
export async function deleteDemonByID(req, res) {
  try {
    const { demonID } = req.params;

    const demon = await Demon.findOneAndDelete({ demonID });

    if (!demon) {
      return res.status(404).json({ 
        error: 'Demon not found' });
    }

    res.status(200).json({
      message: 'Demon deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}
