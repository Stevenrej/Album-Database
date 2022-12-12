"use strict";

const { server } = require("../src/server");
const { db, users } = require("../src/models");
const supertest = require("supertest");
const request = supertest(server);

//prepares the test before we actually test
beforeAll(async () => {
  await db.sync();
  await users.create({
    username: "tester",
    password: "pass",
  });
});

// this happens after every test, and tears the mock database down
afterAll(async () => {
  await db.drop();
});

describe("Testing User Routes: ", () => {
  test('should respond with a status 200 with a successful login to the "/signin" route', async () => {
    let response = await request.post("/signin").auth("tester", "pass");
    expect(response.status).toEqual(200);
  });

  test("should respond with a status 201 with a successful sign up a user", async () => {
    const response = await request
      .post("/signup")
      .send({ username: "banana", password: "chips" });
    expect(response.status).toEqual(201);
  });

  test("should respond with the newly created user after sign up", async () => {
    const response = await request
      .post("/signup")
      .send({ username: "apple", password: "chips" });
    const expected = response.body.user.username;
    const actual = "apple";
    expect(expected).toEqual(actual);
  });
});

// describe("Basic auth middleware", () => {
//   it("fails on signin as expected", async () => {
//     let req = {
//       headers: {
//         authorization: "Basic banana",
//       },
//     };
//     let res = {};
//     let next = jest.fn();

//   await basicAuth(req, res, next);
//   expect(next).toHaveBeenCalledWith("Invalid Login");
// });
// test("passes appropriately", async () => {
//   let req = {
//     headers: {
//       authorization: "Basic dGVzdGVyOnBhc3M=",
//     },
//   };
//   let res = {};
//   let next = jest.fn();

//     await basicAuth(req, res, next);
//     expect(next).toHaveBeenCalledWith();
//   });
// });
