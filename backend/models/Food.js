import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  shopkeeperId: {
    type: String,
    default: ""
  },
  shopName: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export default mongoose.model("Food", foodSchema);
