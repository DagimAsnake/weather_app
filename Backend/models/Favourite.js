import mongoose from 'mongoose';

const FavouriteSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.models.Favourite ||
  mongoose.model('Favourite', FavouriteSchema);
