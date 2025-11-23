import { Schema, model } from 'mongoose';
import Counter from '../counter.js';

const missionSchema = new Schema(
  {
    missionID: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Corps Mission', 'Hashira Mission', 'Suicide Mission'],
      required: true,
    },
    targetDemon: {
      type: String, 
      required: true,
    },
    demonID: {
      type: String, 
      required: true,
      ref: 'Demon',
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    assignedTo: {
      type: String,
      ref: 'User',
      required: true,
    },
    expReward: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

missionSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'missionID' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.missionID = `m${counter.seq}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

export const Mission = model('Mission', missionSchema);
