import express from 'express'
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getuserDashboardData } from "../controllers/user.controller.js"

const router = express.Router();

router.get('/dashboard', protectRoute, getuserDashboardData);

export default router;