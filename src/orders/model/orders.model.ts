import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    shippingAdress: {
      type: {
        fullName: String,
        address: String,
        street: String,
        city: String,
        phoneNum: Number,
      },

      required: true,
    },
    isDelivered: { type: Boolean, default: false },
    orderItems: {
      type: [
        { productId: String, price: Number, quantity: Number, rating: Number },
      ],
      required: true,
      default: [],
    },
    paymentMethod: { type: String, enum: ['CASH', 'BANKING'], default: 'CASH' },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);
