import { RequestHandler } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { Author } from "../entities/Author";
import { signUpSchema, loginSchema } from "../utils/validation";

dotenv.config();

if (!process.env.PRIVATE_KEY) {
  throw new Error("No private key for JWT found in environment variables!");
}

const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const signUp: RequestHandler = async (req, res) => {
  try {
    const authorRepo = getRepository(Author);
    const { error, value } = signUpSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error!", error });
    }
    const { email, firstName, lastName, password } = value;
    const sameEmail = await authorRepo.findOne({ email });
    if (sameEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    let author = new Author();
    author.email = email;
    author.firstName = firstName;
    author.lastName = lastName;
    author.password = hashedPass;
    await authorRepo.save(author);
    res.status(201).json({
      message: "Save successful!",
      user: {
        id: author.id,
        email: author.email,
        firstName: author.firstName,
        lastName: author.lastName,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const authorRepo = getRepository(Author);
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error!", error });
    }
    const { email, password } = value;
    const author = await authorRepo.findOne({ email });
    if (!author) {
      res.status(401).json({ message: "Email not found!" });
      return;
    }
    const doMatch = await bcrypt.compare(password, author.password);
    if (!doMatch) {
      res.status(401).json({ message: "Wrong password!" });
      return;
    }
    const token = jwt.sign(
      { email: author.email, id: author.id },
      PRIVATE_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token: token, userId: author.id });
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};

// For testing purposes only
export const getUsers: RequestHandler = async (req, res) => {
  try {
    const authorRepo = getRepository(Author);
    const users = await authorRepo.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed, error occurred!", error: err });
  }
};
