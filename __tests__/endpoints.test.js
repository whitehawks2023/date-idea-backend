const app = require("../app");
const db = require("../connection");
const fs = require("fs/promises");
const request = require("supertest");
require("jest-sorted");

describe("GET - All users:", () => {
  test("200: Responds with an users array of users objects:", () => {
    return request(app)
      .get("/api/user")
      .expect(200)
      .then(({ body }) => {
        body.users.forEach((user) => {
          expect(user).toHaveProperty("_id", expect.any(String));
          expect(user).toHaveProperty("firstName", expect.any(String));
          expect(user).toHaveProperty("lastName", expect.any(String));
          expect(user).toHaveProperty("age", expect.any(String));
        });
      });
  });
});

afterAll(() => {
  db.end();
});
