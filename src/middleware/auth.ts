import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface JwtRequest extends Request {
  user?: {
    id: number;
    role: "admin" | "manager" | "employee";
  };
}

const verifyJwt = (req: JwtRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json("No authorization header found");
  }

  const token = authHeader.split(" ")[1];
 const secretKey = process.env.JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded as JwtRequest["user"];
    next();
  } catch (err) {
    return res.status(401).json("Invalid token");
  }
};

export default verifyJwt;
