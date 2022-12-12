"use strict";

const { server } = require("../src/server");
const { db, users } = require("../src/models");
const supertest = require("supertest");
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
  await users.create({
    username: "tester2",
    password: "pass",
  });
});

afterAll(async () => {
  await db.drop();
});

describe("Testing Album Routes: ", () => {
  test("should ", async () => {
    let response = await request.post("/signin").auth("tester2", "pass");

    const token = response.body.token;

    response = await request
      .get("/album")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
  });
});
