/* Importing modules */
import { Router } from "express";
import * as registerController from "../controllers/auth/register.controller";
import * as registerValidator from "../validators/register.validator";

const router: Router = Router();

/* Routes */
// POST api/auth/register - Create a user
router.post("/register", registerValidator.register, registerController.register);

// POST api/auth/verify-email - Verify email
router.post("/verify-email", registerValidator.verifyEmail, registerController.verifyEmail);

export default router;