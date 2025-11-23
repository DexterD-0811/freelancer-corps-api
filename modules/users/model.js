import { model, Schema } from 'mongoose';
import Counter from '../counter.js';

const profileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    enum: ['Mizunoto - Novice', 'Tsuchinoe - Mid Rank', 'Hashira - Elite', 'Corps Leader'],
    default: 'Mizunoto - Novice'
  },
  experience: {
    type: Number,
    default: 0
  },
  breathingStyle: {
    type: String,
    default: "No breathing Style",
  },
  killCount: {
    type: Number,
    default: 0
  },
  missionsCompleted: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'Active'
  }
});

const userSchema = new Schema({
  userID: {
    type: Number,
    unique:true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guest'],
    default: 'user',
    required: true,
  },
  profile: [profileSchema],
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'userID' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.userID = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

export const User = model('User', userSchema);