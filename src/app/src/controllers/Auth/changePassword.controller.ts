import { Request, Response } from "express";

const changePassword = (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.send({});
};

export { changePassword };
