import { signInRouter } from "./signIn.routes";

import express from "express";
import { signUpRouter } from "./signup.routes";
import { logoutRoute } from "./logout.routes";

const router = express.Router();

router.use(signUpRouter);
router.use(signInRouter);
router.use(logoutRoute);

export { router as authRouter };
