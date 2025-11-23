import { Report } from './model.js';

//CREATE A NEW REPORT
export async function createReport(req, res) {
  try {
    const {
      reportTitle,
      status = 'newReport',
      content,
      result,
      notes
    } = req.body;

    const user = req.validatedUser;
    const mission = req.validatedMission;
    const demon = req.validatedDemon;

    const report = new Report({
      reportTitle,
      status,
      missionID: mission?.missionID,
      missionTitle: mission?.title,
      demonID: demon?.demonID,
      targetDemon: demon?.name,
      userID: user.userID,
      assignedTo: user.username,
      content,
      result,
      notes
    });

    await report.save();

    res.status(201).json({ 
      message: 'Report created successfully', report 
    });
  } catch (error) {
    console.error('createReport error:', error);
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}


//GET ALL REPORTS
export async function getAllReports(req, res) {
  try {
    const reports = await Report.find({});
    res.status(200).json({ reports });
  } catch (error) {
    console.error('getAllReports error:', error);
    res.status(500).json({ 
      error: 'Server error'
    });
  }
}

//GET A REPORT BY reportID
export async function getReportByID(req, res) {
  try {
    const { reportID } = req.params;

    const report = await Report.findOne({ reportID });
    if (!report) {
      return res.status(404).json({ 
        error: 'Mission not found' 
      });
    }

    res.status(200).json({ report });
  } catch (error) {
      console.error('getReportByID error:', error);
      res.status(500).json({ 
        error: 'Server error' 
      });
  }
}

//Update all fields
export async function updateReportByID(req, res) {
  try {
    const { reportID } = req.params;
    const updateData = req.body;

    if (updateData.reportID) delete updateData.reportID;

    const report = await Report.findOne({ reportID });
    if (!report) {
      return res.status(404).json({ 
        error: 'Report not found' 
      });
    }

    Object.assign(report, updateData);

    await report.save();

    res.status(200).json({
      message: 'Report updated successfully',
      report,
    });
  } catch (error) {
    console.error('updateReportByID error:', error);
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}

// Delete a report by reportID
export async function deleteReportByID(req, res) {
  try {
    const { reportID } = req.params;

    const deletedReport = await Report.findOneAndDelete({ reportID });

    if (!deletedReport) {
      return res.status(404).json({ 
        error: 'Report not found' 
      });
    }

    res.status(200).json({ message: `Report ${reportID} deleted successfully` });
  } catch (error) {
    console.error('deleteReportByID error:', error);
    res.status(500).json({ 
      error: 'Server error' 
    });
  }
}