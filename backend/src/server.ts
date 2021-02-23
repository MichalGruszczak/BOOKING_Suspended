import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ! MONGODB CONNECTION
mongoose.connect(
  process.env.MONGODB!,
  { useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.log("MongoDB Connected");
  }
);

// ! RUNNING SERVER
app.listen(5000, () => {
  console.log("Server running at port 5000");
});
