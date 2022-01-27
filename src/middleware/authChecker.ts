import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.PRIVATE_KEY) {
  throw new Error("No private key for JWT found in environment variables!");
}

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const authChecker: RequestHandler = (req, res, next) => {
  try {
    const authInfo = req.get("Authorization");
    if (!authInfo) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }
    const token = authInfo.split(" ")[1];
    const decodedToken = jwt.verify(token, PRIVATE_KEY) as JwtPayload;
    if (!decodedToken) {
      res.status(401).json({ message: "Authentication failed" });
    }
    req.userId = decodedToken.id;
    next();
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export default authChecker;
