import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  id: string;
  name: string;
  surname: string;
  point: string;
  permissions: string[];
  status: string;
}

const EmployeeSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  point: {
    type: String,
    required: true,
  },
  permissions: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
