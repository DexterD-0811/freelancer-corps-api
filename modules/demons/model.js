import { model, Schema } from 'mongoose';
import Counter from '../counter.js'

const demonSchema = new Schema(
  {
    demonID: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      enum: ['Demon', 'Lower-Moon', 'Upper-Moon', 'Demon-King'],
      required: true,
    },
    powerLevel: {
      type: Number,
      default: 10000,
      required: true,
    },
    status: {
      type: String,
      enum: ['Alive', 'Dead', 'Captured'],
      default: 'Alive',
    },
  },
  {
    timestamps: true,
  }
);

demonSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'demonID' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      this.demonID = `d${counter.seq}`;
    } catch (err) {
      return next(err);
    }
  }
  next();

});
export const Demon = model('Demon', demonSchema);