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
      quantity: Number,
      shopkeeperId: {
        type: String,
        default: ""
      },
      shopName: {
        type: String,
        default: ""
      }
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
    enum: ["Pending", "Accepted", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
    default: "Pending"
  },
  shopkeeperId: {
    type: String,
    default: ""
  },
  shopName: {
    type: String,
    default: ""
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
