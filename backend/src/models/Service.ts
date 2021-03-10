import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  id: string;
  name: string;
  description?: string;
  price: number;
  time: number;
}

const ServiceSchema: Schema = new Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  time: Number,
});

export default mongoose.model<IService>("Service", ServiceSchema);
