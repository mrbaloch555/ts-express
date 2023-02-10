import mongoose from "mongoose";
import { log } from "winston";
import config from "../../../../../config/config";
import { Token } from "../../../../../database/models";
import { TokenTypes } from "../../../../../database/models/interfaces/token.interface";
import { createJwtToken } from "../createToken.repository";
import { saveToken } from "../saveToken.respository";
import { verifyToken } from "../verifyToken.repository";
import request from "supertest";
import app from "../../../../../server/app";
import { generateAuthTokens } from "../generateAuthTokens.repository";
it("returns a valid token", async () => {
  const payload = {
    userId: new mongoose.Types.ObjectId().toHexString(),
    expiresIn: "10d",
    type: TokenTypes.access,
    secret: config.jwtScret,
  };

  const token = createJwtToken(payload);
  expect(token).not.toBeNull();
});

it("create a token and save it to database", async () => {
  const user = new mongoose.Types.ObjectId().toHexString();
  const payload = {
    userId: user,
    expiresIn: "10d",
    type: TokenTypes.access,
    secret: config.jwtScret,
  };

  const token = createJwtToken(payload);
  expect(token).not.toBeNull();

  await saveToken({
    token,
    user,
    expires: "10d",
    type: TokenTypes.access,
  });
  const tokens = await Token.find();
  expect(tokens.length).toEqual(1);
  expect(token).toEqual(tokens[0].token);
});

it("create a token and verfiy it", async () => {
  const user = new mongoose.Types.ObjectId().toHexString();
  const payload = {
    userId: user,
    expiresIn: "10d",
    type: TokenTypes.access,
    secret: config.jwtScret,
  };
  const token = createJwtToken(payload);
  await saveToken({
    token,
    user,
    expires: "10d",
    type: TokenTypes.access,
  });
  expect(token).not.toBeNull();

  const decoded = await verifyToken(token, TokenTypes.access);
  expect(decoded.user.toString()).toEqual(user.toString());
});

it("create tokens, save token and returns tokens", async () => {
  const user = await request(app)
    .post("/v1/api/auth/signup")
    .send({
      firstName: "Durrah",
      lastName: "Khan",
      email: "test@test.com",
      password: "password12",
    })
    .expect(201);
});
