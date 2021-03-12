import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  id: string;
  client: {
    name: string;
    surname: string;
    phone: string;
  };
  pointID: string;
  serviceID: string;
  employeeID: string | undefined;
  date: string;
  hour: string;
  time: number;
}

const BookingSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  client: {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  pointID: {
    type: String,
    required: true,
  },
  serviceID: {
    type: String,
    required: true,
  },
  employeeID: String,
  date: {
    type: String,
    required: true,
  },

  hour: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IBooking>("Booking", BookingSchema);
