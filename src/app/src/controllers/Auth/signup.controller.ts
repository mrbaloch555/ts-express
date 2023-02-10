import { Request, Response } from "express";
import { AsyncHandler } from "../../../../utils/AsyncHandler";
import { authRespository } from "../../repository";

const signUp = AsyncHandler(async (req: Request, res: Response) => {
  const userBody = req.body;
  if (req.file) {
    userBody.photoPath = req.file.filename;
  }
  const user = await authRespository.signUp(userBody);
  return res.status(201).send(user);
});

export { signUp };
