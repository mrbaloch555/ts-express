import { Request, Response } from "express";
import { authRespository } from "../../repository";
import { generateAuthTokens } from "../../repository/Token/generateAuthTokens.repository";

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authRespository.signIn(email, password);
  const tokens = await generateAuthTokens(user);
  res.send({ user, tokens });
};

export { signIn };
