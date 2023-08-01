const { AsyncLocalStorage } = require("async_hooks");
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
          expect(user).toHaveProperty("first_name", expect.any(String));
          expect(user).toHaveProperty("last_name", expect.any(String));
          expect(user).toHaveProperty("age", expect.any(Number));
        });
      });
  });
});
describe("GET - All user_ideas:", () => {
  test("200: Responds with ideas array of users idea objects:", () => {
    return request(app)
      .get("/api/user_ideas")
      .expect(200)
      .then(({ body }) => {
        body.ideas.forEach((idea) => {
          expect(idea).toHaveProperty("_id", expect.any(String));
          expect(idea).toHaveProperty("username", expect.any(String));
          expect(idea).toHaveProperty("location", expect.any(String));
          expect(idea).toHaveProperty("description", expect.any(String));
          expect(idea).toHaveProperty("date_type", expect.any(String));
          expect(idea).toHaveProperty("price_pp", expect.any(Number));
          expect(idea).toHaveProperty("opening_time", expect.any(String));
          expect(idea).toHaveProperty("closing_time", expect.any(String));
          expect(idea).toHaveProperty("img", expect.any(String));
        });
      });
  });
});

afterAll(() => {
  db.end();
});
