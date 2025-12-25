import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  size: String,
  price: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
    max: 30,
  },
  stock: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Product", schema);
