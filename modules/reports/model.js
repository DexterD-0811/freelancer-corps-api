import { Schema, model } from 'mongoose';
import Counter from '../counter.js'

const reportSchema = new Schema(
  {
    reportID: {
      type: String,
      unique: true,
    },
    reportTitle: {
      type: String,
      required: true,
    },
    missionID: {
      type: String,
      ref: 'Mission',
    },
    missionTitle: {
      type:String,
    },
    demonID: {
      type: String,
      ref: 'Demon',
    },
    targetDemon: {
      type: String,
    },
    userID: {
      type: Number,
      ref: 'User',
      required: true,
    },
    assignedTo: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      enum: ['Success', 'Failure'],
      required: true,
    },
    status: {
      type: String,
      enum: ["newReport", "missionUpdate", "resolved"],
      default: "newReport",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'reportID' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.reportID = `r${counter.seq}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

export const Report = model('Report', reportSchema);
