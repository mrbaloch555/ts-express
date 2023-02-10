import dotenv from "dotenv";
import Joi from "joi";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("pod", "dev", "stage", "test").required(),
    MONGO_URI: Joi.string().required().description("Mongodb URI is required"),
    PORT: Joi.number().required().description("Port is required"),
    JWT_SECRET: Joi.string().required().description("JWT Secret is required"),
    ROOT_PATH: Joi.string().required().description("Root Path is required"),
    JWT_EXPIRATION_ACCESS: Joi.string()
      .required()
      .description("JWT Expiration time is required!"),
    JWT_EXPIRATION_REFRESH: Joi.string()
      .required()
      .description("JWT Expiration time is required!"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: { label: "key" },
  })
  .validate(process.env);

if (error) {
  throw new Error(`Config validations error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtScret: envVars.JWT_SECRET,
  jwtExpirationAccess: envVars.JWT_EXPIRATION_ACCESS,
  jwtExpirationRefresh: envVars.JWT_EXPIRATION_REFRESH,
  rootPath: envVars.ROOT_PATH,
  mongoose: {
    url: envVars.MONGO_URI + (envVars.NODE_ENV === "test" ? "-test" : ""),
  },
};

export default config;
