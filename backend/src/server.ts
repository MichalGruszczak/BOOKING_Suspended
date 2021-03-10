import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ! MONGODB CONNECTION
mongoose.connect(
  process.env.MONGODB!,
  { useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.log("MongoDB Connected");
  }
);

// ! ROUTES
app.use("/api/admin", require("./routes/admin"));
app.use("/api/point", require("./routes/point"));
app.use("/api/service", require("./routes/service"));

// ! RUNNING SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at port ${port} `);
});
