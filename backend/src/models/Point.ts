import mongoose, { Schema, Document } from "mongoose";

export interface IPoint extends Document {
  id: string;
  name: string;
  street: string;
  employees: string[];
  services: string[];
  bookings: string[];
}

const PointSchema: Schema = new Schema({
  id: String,
  name: String,
  street: String,
  employees: {
    type: Array,
    default: [],
  },
  services: {
    type: Array,
    default: [],
  },
  bookings: {
    type: Array,
    default: [],
  },
});

export default mongoose.model<IPoint>("Point", PointSchema);
