import express from "express";
import { authRouter } from "./Auth";
const router = express.Router();

const allRoutes = [
  {
    path: "/v1/api/auth",
    route: authRouter,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export { router };
