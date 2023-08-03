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
          expect(idea).toHaveProperty("price", expect.any(Number));
          expect(idea).toHaveProperty("opening_time", expect.any(String));
          expect(idea).toHaveProperty("closing_time", expect.any(String));
          expect(idea).toHaveProperty("img", expect.any(String));
        });
      });
  });
});
describe("Post - create a new unique user:", () => {
  test("201: Responds with created unique user:", () => {
    const testUser = {
      username: "br13",
      first_name: "lit",
      last_name: "piazza",
      email: "piazza@gmail.com",
      age: 73,
      avatar: "https://jkenfwfesajffn",
    };
    return request(app)
      .post("/api/user")
      .send(testUser)
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty("_id", expect.any(String));
        expect(body).toHaveProperty("first_name", expect.any(String));
        expect(body).toHaveProperty("last_name", expect.any(String));
        expect(body).toHaveProperty("age", expect.any(Number));
      });
  });
});
describe("Post - create a new user idea:", () => {
  test("201: Responds with created user Idea:", () => {
    const testUserIdea = {
      username: "test",
      location: "test",
      description: "test",
      date_type: "test",
      price: 0.0,
      latitude: 54.8957,
      longtitude: 45.345,
      opening_time: "00:00",
      closing_time: "00:00",
      img: "url",
    };
    return request(app)
      .post("/api/user_ideas")
      .send(testUserIdea)
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty("_id", expect.any(String));
        expect(body).toHaveProperty("username", expect.any(String));
        expect(body).toHaveProperty("location", expect.any(String));
        expect(body).toHaveProperty("description", expect.any(String));
        expect(body).toHaveProperty("date_type", expect.any(String));
        expect(body).toHaveProperty("price", expect.any(Number));
        expect(body).toHaveProperty("latitude", expect.any(Number));
        expect(body).toHaveProperty("longtitude", expect.any(Number));
        expect(body).toHaveProperty("opening_time", expect.any(String));
        expect(body).toHaveProperty("closing_time", expect.any(String));
        expect(body).toHaveProperty("img", expect.any(String));
      });
  });
});
describe("DELETE user", () => {
  test("Should delete a specified user", () => {
    return request(app)
      .delete("/api/user/br13")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });
});
describe("DELETE user_idea", () => {
  test("Should delete a specified user idea, if the user is the owner of the post", () => {
    return request(app)
      .delete("/api/user_ideas/64cb61fa56978cba6c42dba0")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });
});

describe("PATCH - updates the user info:", () => {
  test("200: Responds with updated user object when only specified fields are changed", () => {
    const userPatch = {
      first_name: "litty",
      last_name: "senior",
    };
    return request(app)
      .patch("/api/user/br15")
      .send(userPatch)
      .expect(200)
      .then(({ body }) => {
        expect(body.acknowledged).toBe(true);
      });
  });

  test("200: Responds with updated user object when all fields are changed", () => {
    const userPatch = {
      first_name: "johnson",
      last_name: "pizza",
      email: "pizzamama999@gmail.com",
      avatar: "https://www.google.com",
    };
    return request(app)
      .patch("/api/user/br12")
      .send(userPatch)
      .expect(200)
      .then(({ body }) => {
        expect(body.acknowledged).toBe(true);
      });
  });
});

afterAll(() => {
  db.end();
});
