import request from "supertest";
import { Token } from "../../../../../database/models";
import app from "../../../../../server/app";

it("returns 400 for invalid body", async () => {
  return request(app)
    .post("/v1/api/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "passwor12",
    })
    .expect(400);
});

it("returns 400 for invalid email address", async () => {
  return request(app)
    .post("/v1/api/auth/signup")
    .send({
      email: "test@gmail",
      password: "passwor12",
      firstName: "Durrah",
      lastName: "Khan",
    })
    .expect(400);
});

it("returns 400 if email already in use", async () => {
  await request(app)
    .post("/v1/api/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "passwor12",
      firstName: "Durrah",
      lastName: "Khan",
    })
    .expect(201);
  await request(app)
    .post("/v1/api/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "passwor12",
      firstName: "Durrah",
      lastName: "Khan",
    })
    .expect(400);
});

it("returns 400 for extra body part is added", async () => {
  return request(app)
    .post("/v1/api/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "passwor12",
      firstName: "Durrah",
      lastName: "Khan",
      extra: "extra",
    })
    .expect(400);
});

it("returns 201 for successfull signup", async () => {
  return request(app)
    .post("/v1/api/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "passwor12",
      firstName: "Durrah",
      lastName: "Khan",
    })
    .expect(201);
});

it("signup a user and signin for user and returns 200", async () => {
  await request(app)
    .post("/v1/api/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "passwor12",
      firstName: "Durrah",
      lastName: "Khan",
    })
    .expect(201);
  const { body: user } = await request(app)
    .post("/v1/api/auth/signin")
    .send({ email: "test@gmail.com", password: "passwor12" })
    .expect(200);

  // expect(use)
});

it("returns 400 for invalid body on logout", async () => {
  await request(app)
    .post("/v1/api/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "passwor12",
      firstName: "Durrah",
      lastName: "Khan",
    })
    .expect(201);
  const { body: user } = await request(app)
    .post("/v1/api/auth/signin")
    .send({ email: "test@gmail.com", password: "passwor12" })
    .expect(200);
  await request(app)
    .post("/v1/api/auth/logout")
    .set("Authorization", `Bearer ${user.tokens.access.token}`)
    .send()
    .expect(400);
});

it("Auth is required for logout, test again after auth middleware", async () => {
  await request(app)
    .post("/v1/api/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "passwor12",
      firstName: "Durrah",
      lastName: "Khan",
    })
    .expect(201);
  const { body: user } = await request(app)
    .post("/v1/api/auth/signin")
    .send({ email: "test@gmail.com", password: "passwor12" })
    .expect(200);

  const res = await request(app)
    .post("/v1/api/auth/logout")
    .set("Authorization", `Bearer ${user.tokens.access.token}`)
    .send({ refreshToken: user.tokens.refresh.token })
    .expect(200);
  const tokens = await Token.find({});
  expect(tokens.length).toEqual(0);
});
