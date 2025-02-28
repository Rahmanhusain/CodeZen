import mongoose, { Schema } from "mongoose";

const CounterSchema = new mongoose.Schema({
  sequenceName: {
    type: String,
    required: true,
    unique: true,
  },
  sequenceValue: {
    type: Number,
    default: 1,
  },
});

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

const UserSchema = new mongoose.Schema({
  userid: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  profilePhoto: {
    type: String,
    default:
      "https://iffadcitwirnptuabcbr.supabase.co/storage/v1/object/public/findyourdateuserimages//avatar.png",
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  alternatePhoneNumber: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  pickupSchedules: {
    type: [String], // Assuming pickup schedules are stored as strings
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to assign unique `userid` if not present
UserSchema.pre("save", async function (next) {
  if (!this.userid) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { sequenceName: "userId" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );

      // Check if counter was updated successfully
      if (counter && counter.sequenceValue) {
        this.userid = counter.sequenceValue;
      } else {
        throw new Error("Failed to generate userId.");
      }

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
