import express from "express";
import { authController } from "../../controllers";
import validate from "../../middlewares/joiValidator";
import { authValidation } from "../../validations";

const router = express.Router();

router.post("/signin", validate(authValidation.signIn), authController.signIn);
export { router as signInRouter };
