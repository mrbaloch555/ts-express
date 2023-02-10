import express from "express";
import fileUpload from "../../../../utils/fileUpload";
import { authController } from "../../controllers";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/joiValidator";
import { authValidation } from "../../validations";

const router = express.Router();

router.post(
  "/logout",
  auth(),
  validate(authValidation.logout),
  authController.logout
);
export { router as logoutRoute };
