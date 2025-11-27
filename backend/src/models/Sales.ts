import mongoose, { Schema, Document } from "mongoose";
import Product from "./Product.js";

interface ISale extends Document {
  product: mongoose.Types.ObjectId;
  buyer: string;
  date: Date;
  quantity: number;
  totalPrice: number;
  receiptId: string;
}

const schema = new Schema<ISale>({
  product: { type: Schema.Types.ObjectId, ref: "Products" },
  buyer: {
    type: String,
    min: 3,
    max: 20,
  },
  date: { type: Date, default: Date.now },
  quantity: {
    type: Number,
    min: 1,
  },
  totalPrice: { type: Number },
  receiptId: { type: String, default: () => crypto.randomUUID(), unique: true },
});

schema.pre("save", async function () {
  const product = await Product.findById(this.product);
  if (product && product.price) {
    this.totalPrice = product.price * this.quantity;
  } else {
    this.totalPrice = 0;
  }
});

schema.set("toJSON", {
  transform: function (_doc, returnedObject) {
    const obj = returnedObject as unknown as Record<string, unknown>;
    obj["id"] = obj["_id"];
    delete obj["_id"];
    delete obj["__v"];
    return obj;
  },
});

export default mongoose.model<ISale>("Sale", schema);
