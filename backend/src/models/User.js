import mongoose, { Schema } from "mongoose";

const schema = new mongoose.schema({
  details: {
    firstName: String,
    lastName: String,
    email: String,
  },
  password: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  sales: [{ type: Schema.Types.ObjectId, ref: "Sale" }],
  credits: [{ type: Schema.Types.ObjectId, ref: "Credits" }],
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("User", schema);
