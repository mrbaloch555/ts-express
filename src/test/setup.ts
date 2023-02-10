import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

let mongo: any;

beforeAll(async () => {
  process.env.NODE_ENV = "test";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
