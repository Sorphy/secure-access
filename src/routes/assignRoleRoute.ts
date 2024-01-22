import express, { Router } from "express";
import { assignRole } from "../controllers/assignRoleController";

import verifyJwt from "../middleware/auth";

const assignRoleRouter: Router = express.Router();

assignRoleRouter.post("/assign-role", verifyJwt, assignRole);

export default assignRoleRouter;
