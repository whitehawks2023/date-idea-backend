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

describe("Post - create a new user:", () => {
  test("201: Responds with created user:", () => {
    const testUser = {
      username: "br12",
      first_name: "banana",
      last_name: "republic",
      email: "br12@gmail.com",
      age: 43,
      avatar: "https://jkenfwkjfn",
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
describe("Post - create a new user:", () => {
  test("201: Responds with created user Idea:", () => {
    const testUserIdea = {
      username: "test",
      location: "test",
      description: "test",
      date_type: "test",
      price_pp: 0.0,
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
        expect(body).toHaveProperty("price_pp", expect.any(Number));
        expect(body).toHaveProperty("opening_time", expect.any(String));
        expect(body).toHaveProperty("closing_time", expect.any(String));
        expect(body).toHaveProperty("img", expect.any(String));
      });
  });
});

// describe("PATCH - updates the user info:", ()=> {
//   test("200: Responds with updated user object", () => {
//     const testPatch = {
//       inc_votes: 1,
//     }
//     return request(app)
//     .patch("/api/articles/1")
//     .send(testPatch)
//     .expect(200)
//     .then(({body})=>{
//       const { patchedArticle } = body;
//       expect(patchedArticle).toHaveProperty("votes", expect.any(Number));
//       expect(patchedArticle).toHaveProperty("article_id", expect.any(Number));
//       expect(patchedArticle.votes).toBe(101)
//     })
//   });

afterAll(() => {
  db.end();
});
