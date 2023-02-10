import { connectDatabase } from "../database/db.init";
import app from "./app";
import config from "../config/config";
const __init__ = async () => {
  app.listen(config.port, async () => {
    await connectDatabase();
    console.log("Starting application on port ", config.port);
  });
};

__init__();
