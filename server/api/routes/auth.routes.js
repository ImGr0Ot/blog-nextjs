import { Router } from "express";
import { validateSchema } from "../validators/validator.js";
import { registerSchema, loginSchema } from "../validators/auth.schema.js";
import {
  login,
  logout,
  register,
  getUsers,
  verifyToken,
  update,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);
router.put("/user/:email", update);

export default router;
