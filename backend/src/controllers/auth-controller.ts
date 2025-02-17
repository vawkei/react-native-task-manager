import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../db/dbSetup";
import { UserEntity } from "../entities/user-entity";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log(`username:${username},email:${email},password:${password}`);

  if (!username || !email || !password) {
    res.status(400).json({ msg: "please fill in the inputs" });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ msg: "password should be at least 6 letters" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    username: username,
    password: hashedPassword,
    email: email,
    isRegistered: true,
  };

  try {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const userExist = await userRepository.findOne({ where: { email } });
    //userRepository.findOne,takes an object. hence:{ email }

    if (userExist) {
      console.log("user already exist, kindly log in");
      res.status(401).json({ msg: "user already exist, kindly log in" });
      return;
    }

    const newUser = userRepository.create(userData);
    await userRepository.save(newUser);
    console.log("new user:", newUser);

    res.status(201).json({
      msg: "new user registered successfully, log in please",
      user: newUser,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("error message:", message);

    res.status(500).json({ msg: message });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("this is the login route.");

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "please fill in the inputs" });
    return;
  }

  try {
    console.log("starting the try block for login...");

    const userRepository = AppDataSource.getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { email } });

    console.log("user:", user);

    if (!user) {
      console.log("user not found, please register");
      res.status(401).json({ msg: "user not found, please register" });
      return;
    }

    if (!user.isRegistered) {
      res.status(401).json({ msg: "user hasn't been registered" });
      console.log("user not found, please register");
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("passwords don't match");
      res.status(401).json({ msg: "invalid password" });
      return;
    }

    console.log("about to issue the jwt.sign in");

    const generateToken = (uuid: string, username: string) => {
      // Convert expiresIn to numeric seconds
      //parseInt(value, 10) ensures that the string is converted to a base-10 integer.

      const tokenDuration = parseInt(process.env.ExpiresIn || "3600", 10);

      return `Bearer ${jwt.sign({ uuid, username }, process.env.SecretKey!, {
        expiresIn: tokenDuration,
      })}`;
    };

    const token = generateToken(user.uuid, user.username);
    console.log("login token:", token);

    res.status(201).json({ msg: "user logged in successfully", token: token, user:user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("error message:", message);
    res.status(500).json({ msg: message });
  }
};

export const logOut = (_req: Request, res: Response) => {
  console.log("the logout route");

  res.status(200).json({ msg: "user logged out successfully" });
};
