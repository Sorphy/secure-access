import express, { Router } from "express";
import { signIn, signUp } from "../controllers/userController";
import { assignRole } from "../controllers/assignRoleController";
import {
  adminOnly,
  adminAndManagers,
  adminManagersEmployees} from "../controllers/authController";
import { checkRole } from '../middleware/rbac';
import verifyJwt  from "../middleware/auth";



const userRouter: Router = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.post("/assign-role", verifyJwt, assignRole); 

userRouter.get('/admin-only', verifyJwt, checkRole(['admin']), adminOnly);

userRouter.get(
  "/admin-and-managers",
  verifyJwt,
  checkRole(["admin", "manager"]),
  adminAndManagers
);

userRouter.get(
  "/admin-managers-employees",
  verifyJwt,
  checkRole(["admin", "manager", "employee"]),
  adminManagersEmployees
);

export default userRouter;


