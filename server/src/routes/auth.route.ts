/* Importing modules */
import { Router } from "express";
import * as registerController from "../controllers/auth/register.controller";
import * as registerValidator from "../validators/register.validator";
import * as loginController from "../controllers/auth/login.controller";
import * as loginValidator from "../validators/login.validator";
import * as tokenMiddleware from "../middlewares/tokens.middleware";

const router: Router = Router();

/* Routes */
// POST api/auth/register - Create a user
router.post("/register", registerValidator.register, registerController.register);

// POST api/auth/verify-email - Verify email
router.post("/verify-email", registerValidator.verifyEmail, registerController.verifyEmail);

// POST api/auth/login - Login
router.post("/login", loginValidator.login, loginController.login);

// GET api/auth/check-login - Check if the user is already logged
router.get("/check-login", tokenMiddleware.checkRefreshToken, loginController.checkLogin);

// GET api/auth/refresh-token - Refresh token
router.get("/refresh-token", tokenMiddleware.checkRefreshToken, loginController.refresh);

// GET api/auth/logout - Logout
router.get("/logout", tokenMiddleware.checkRefreshToken, loginController.logout);

export default router;