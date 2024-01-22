import { Request, Response, NextFunction } from "express";
// import { JwtRequest } from "../middleware/auth";

export const adminOnly = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({
      message: "Access granted. Admin privileges successfully applied.",
    });
};

export const adminAndManagers = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({
      message: "Access granted. Admin and managers privileges successfully applied.",
    });
};

export const adminManagersEmployees = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Access granted. Admin, managers and employees privileges successfully applied.",
  });
};



// export const isAdmin = (req: JwtRequest): boolean => {
//  return req.user?.role === "admin";
// };
