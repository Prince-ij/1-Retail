import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  description?: string;
  size?: string;
  price: number;
  cost: number;
  supplier?: string;
  stock: number;
}

const schema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
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

schema.set("toJSON", {
  transform: function (_doc, returnedObject) {
    const obj = returnedObject as unknown as Record<string, unknown>;
    obj["id"] = obj["_id"];
    delete obj["_id"];
    delete obj["__v"];
    return obj;
  },
});

export default mongoose.model<IProduct>("Product", schema);
