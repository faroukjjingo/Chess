import mongoose, { Schema } from 'mongoose';

const gameSchema = new Schema({
  gameId: { type: String, required: true, unique: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  fen: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'completed', 'abandoned'],
    default: 'active',
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Game', gameSchema);
