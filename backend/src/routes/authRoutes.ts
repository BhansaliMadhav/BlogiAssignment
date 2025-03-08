import express from "express";
import { register, login } from "../controllers/authController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", authenticateUser, (req, res) => {
  res.json({ isAuthenticated: true, user: (req as any).user });
});

export default router;
