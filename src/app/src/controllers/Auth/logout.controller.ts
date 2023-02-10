import { Request, Response } from "express";
import { authRespository } from "../../repository";

const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  await authRespository.logout(refreshToken);
  res.send({ success: true });
};

export { logout };
