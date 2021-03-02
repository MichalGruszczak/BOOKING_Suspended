import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  surname?: string;
  position?: string;
  login: string;
  password: string;
}

const AdminSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
  },
  position: {
    type: String,
  },
  login: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export default mongoose.model<IAdmin>("Admin", AdminSchema);
