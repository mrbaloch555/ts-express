import { Request, Response } from "express";
import { AsyncHandler } from "../../../../utils/AsyncHandler";
import { authRespository, userRespository } from "../../repository";

const queryUsers = AsyncHandler(async (req: Request, res: Response) => {
  const filter = {};
  const options = {};
  const reuslt = await userRespository.queryUsers(filter, options);
  return res.send(reuslt);
});

export { queryUsers };
