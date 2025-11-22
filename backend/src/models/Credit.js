import mongoose, { Schema } from "mongoose";
import Product from "./Product";

const schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Products" },
  buyer: {
    type: String,
    min: 3,
    max: 20,
    required: true
  },
  date: { type: Date, default: Date.now },
  quantity: {
    type: Number,
    min: 1
  },
  amountPaid: {
    type: Number,
    default: 0,
  },
  totalDebt: Number,
  status: {
    type: String,
    enum: ["settled", "pending"],
    default: "pending",
  },
  receiptId: { type: String, default: () => crypto.randomUUID(), unique: true },
});

schema.pre("save", async function (next) {
  const product = await Product.findById(this.product);
  if (product) {
    this.totalDebt = product.price * this.quantity - this.amountPaid;
  } else {
    this.totalDebt = 0;
  }
  next();
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Credit", schema);
