import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string; username: string };
}

interface Token {
  uuid: string;
  username: string;
}

const authenticationMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("authenticationMiddleware starts:", req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "Bearer token not provided" });
    console.log("Bearer token not provided");
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SecretKey!) as Token;
    console.log("decoded:", decoded);

    req.user = { userId: decoded.uuid, username: decoded.username };
    console.log("req.user:",req.user);
    
    next()
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("error message:",message);
    res.status(500).json({ msg: message });
  }
};


export default authenticationMiddleware;