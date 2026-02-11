import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [
    {
      foodId: {
        type: String
      },
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending" // Pending, Preparing, Delivered
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Processing", "Paid", "Failed"],
    default: "Pending"
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "CARD", "UPI", "NET_BANKING", "RAZORPAY"],
    default: "COD"
  },
  paymentId: {
    type: String,
    default: ""
  },
  paidAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
