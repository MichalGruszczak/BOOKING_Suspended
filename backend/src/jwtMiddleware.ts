import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestHandler } from "express";

dotenv.config();

export enum AuthResponse {
  NoToken = "No token authorization denied",
  InvalidToken = "Invalid token",
}

const auth: RequestHandler = (req: any, res: any, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.json({ msg: AuthResponse.NoToken });

  try {
    const decoded = jwt.verify(token, process.env.JWTSecret!);

    req.user = decoded;
    next();
  } catch (err) {
    res.json({ msg: AuthResponse.InvalidToken });
  }
};

export default auth;
