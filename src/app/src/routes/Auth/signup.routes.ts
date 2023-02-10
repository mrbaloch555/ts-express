import express from "express";
import fileUpload from "../../../../utils/fileUpload";
import { authController } from "../../controllers";
import validate from "../../middlewares/joiValidator";
import { authValidation } from "../../validations";

const router = express.Router();

router.post(
  "/signup",
  fileUpload.single("photoPath"),
  validate(authValidation.signUp),
  authController.signUp
);
export { router as signUpRouter };
