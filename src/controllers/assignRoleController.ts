import { Request, Response } from "express";
import { JwtRequest } from "../middleware/auth";
import User from "../models/user";
// import { isAdmin } from "./authController";

export const assignRole = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;
    console.log("Assign Role Request:", { userId, role });
    // Check if the requesting user is an admin
     const isAdmin = (req: JwtRequest): boolean => {
     return req.user?.role === "admin";
    };
    if (!isAdmin(req)) {
      console.log("Admin Check Failed");
      return res
        .status(403)
        .json({ error: "Forbidden. Admin access required." });
    }

    // Check if the user exists
    const user = await User.findByPk(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // Define permissions based on the assigned role
    let permissions: string[] = [];
    if (role === "admin") {
      permissions = [
        "MANAGE_PRODUCTS",
        "MANAGE_EMPLOYEES",
        "VIEW_SALES_REPORTS",
      ];
    } else if (role === "manager") {
      permissions = ["VIEW_PRODUCTS", "MANAGE_EMPLOYEES", "VIEW_SALES_REPORTS"];
    } else if (role === "employee") {
      permissions = ["VIEW_PRODUCTS", "VIEW_SALES_REPORTS", "PROCESS_ORDERS"];
    }

    // Update the user's information, including role and permissions
    await user.update({
      role,
      permissions,
    });

    res.status(200).json({ message: "Role assigned successfully" });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
