import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ! DB CONNECTION

// ! ROUTES

// ! RUNNING SERVER

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at port ${port} `);
});
