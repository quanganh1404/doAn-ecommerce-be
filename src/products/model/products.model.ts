import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    categoryId: { type: String, required: true, unique: true },
    image: { type: String },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    nameLowerCase: { type: String },
    rating: { type: Number },
    countInStock: { type: Number, required: true, default: 0 },
    price: { type: Number, default: 0 },
    description: { type: String, default: 'Enter the descriptions' },
    brand: { type: String },
  },
  { timestamps: true },
);
