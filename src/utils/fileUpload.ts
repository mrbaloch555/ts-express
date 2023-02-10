import multer from "multer";
import path from "path";
import { Request } from "express";
import { BadRequestError } from "../errors/badRequest.error";

const storage = multer.diskStorage({
  destination: (req: Request, file, cb: Function) => {
    cb(null, "public/uploads/");
  },
  filename: (req: Request, file, cb: Function) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileUpload = multer({
  storage,
  fileFilter: (req, file, cb: Function) => {
    if (
      !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4)$/)
    ) {
      throw new BadRequestError("Bad file type");
    }
    cb(null, true);
  },
});

export default fileUpload;
