import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rating: { type: Number, default: 1500 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
