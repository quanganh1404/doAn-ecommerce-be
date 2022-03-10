import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: 'This is category description' },
    image: { type: String },
  },
  { timestamps: true },
);
