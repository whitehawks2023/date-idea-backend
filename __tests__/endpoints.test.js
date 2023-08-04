const app = require("../app");
const db = require("../connection");
const fs = require("fs/promises");
const request = require("supertest");
require("jest-sorted");

describe("GET - All users:", () => {
  test("200: Responds with an users array of users objects:", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        body.users.forEach((user) => {
          expect(user).toHaveProperty("_id", expect.any(String));
          expect(user).toHaveProperty("username", expect.any(String));
          expect(user).toHaveProperty("password", expect.any(String));
          expect(user).toHaveProperty("first_name", expect.any(String));
          expect(user).toHaveProperty("last_name", expect.any(String));
          expect(user).toHaveProperty("age", expect.any(Number));
          expect(user).toHaveProperty("email", expect.any(String));
          expect(user).toHaveProperty("avatar", expect.any(String));
        });
      });
  });
});

describe("GET - Non existent route", () => {
  test("Should return 404 Not found when given a non-existent route", () => {
    return request(app)
      .get("/api/notavalidroute")
      .expect(404)
      .then(({ body }) => {
        expect(body).toHaveProperty("msg");
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("GET - Specific user information", () => {
  test("Should return the user that corresponds to a given user id", () => {
    return request(app)
      .get("/api/users/64ca5a5573cc3ca03721c458/azzip")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("_id", expect.any(String));
        expect(body).toHaveProperty("username", expect.any(String));
        expect(body).toHaveProperty("password", expect.any(String));
        expect(body).toHaveProperty("first_name", expect.any(String));
        expect(body).toHaveProperty("last_name", expect.any(String));
        expect(body).toHaveProperty("age", expect.any(Number));
        expect(body).toHaveProperty("email", expect.any(String));
        expect(body).toHaveProperty("avatar", expect.any(String));
      });
  });

  test("Should respond with 404 Not found for a user _id that does not exist", () => {
    return request(app)
      .get("/api/users/6765")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("Should respond with 400 Bad request for an invalid user id", () => {
    return request(app)
      .get("/api/users/jfhd2222££$$$%%/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("Should respond with 400 Bad request for an incorrect password", () => {
    return request(app)
      .get("/api/users/64ca5a5573cc3ca03721c458/skyrim")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("Should respond with 400 Bad request for an incorrect password", () => {
    return request(app)
      .get("/api/users/skyrim/azzip")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
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

describe("GET /api/user_ideas/:_id", () => {
  test("Should return idea that corresponds to a given idea id", () => {
    return request(app)
      .get("/api/user_ideas/64cbad8d6b10fda44f035345")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("_id", expect.any(String));
        expect(body).toHaveProperty("username", expect.any(String));
        expect(body).toHaveProperty("location", expect.any(String));
        expect(body).toHaveProperty("description", expect.any(String));
        expect(body).toHaveProperty("date_type", expect.any(String));
        expect(body).toHaveProperty("price", expect.any(Number));
        expect(body).toHaveProperty("opening_time", expect.any(String));
        expect(body).toHaveProperty("closing_time", expect.any(String));
        expect(body).toHaveProperty("img", expect.any(String));
      });
  });

  test("Should respond with 404 Not found for a idea id that does not exist", () => {
    return request(app)
      .get("/api/users/64cbad8d6b10fda44f0322323115345")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("Should respond with 400 Bad request for an invalid idea id", () => {
    return request(app)
      .get("/api/users/%$£££78hfgdb")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("Post - create a new unique user:", () => {
  test("201: Responds with created unique user:", () => {
    const testUser = {
      username: "br13",
      password: "burgersarebetter",
      first_name: "lit",
      last_name: "piazza",
      email: "piazza@gmail.com",
      age: 73,
      avatar: "https://jkenfwfesajffn",
    };
    return request(app)
      .post("/api/users")
      .send(testUser)
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty("_id", expect.any(String));
        expect(body).toHaveProperty("username", expect.any(String));
        expect(body).toHaveProperty("password", expect.any(String));
        expect(body).toHaveProperty("first_name", expect.any(String));
        expect(body).toHaveProperty("last_name", expect.any(String));
        expect(body).toHaveProperty("email", expect.any(String));
        expect(body).toHaveProperty("age", expect.any(Number));
        expect(body).toHaveProperty("avatar", expect.any(String));
      });
  });

  test("Should respond with status 400, when a user is trying to sign up but leaves username blank", () => {
    const newUser = {
      username: "",
      password: "heymatey",
      first_name: "martin",
      last_name: "odegaard",
      email: "mg1@gmail.com",
      age: 21,
      avatar: "https://arsenalarehorrible.com",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
      expect(body.msg).toBe("username must be at least 3 characters long");
      });
  });

  test("Should respond with status 400, when a user is trying to sign up but leaves password blank", () => {
    const newUser = {
      username: "ronaldo",
      password: "",
      first_name: "martin",
      last_name: "odegaard",
      email: "mg1@gmail.com",
      age: 21,
      avatar: "https://arsenalarehorrible.com",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
      expect(body.msg).toBe("username must be at least 3 characters long");
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
      longitude: 45.345,
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
        expect(body).toHaveProperty("longitude", expect.any(Number));
        expect(body).toHaveProperty("opening_time", expect.any(String));
        expect(body).toHaveProperty("closing_time", expect.any(String));
        expect(body).toHaveProperty("img", expect.any(String));
      });
  });
});
describe("DELETE user", () => {
  test("Should delete a specified user", () => {
    return request(app)
      .delete("/api/users/br13")
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
      .patch("/api/users/br15")
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
      .patch("/api/users/br12")
      .send(userPatch)
      .expect(200)
      .then(({ body }) => {
        expect(body.acknowledged).toBe(true);
      });
  });
});

describe("PATCH - updates the user's idea:", () => {
  test("200: Responds with updated user idea object when only specified fields are changed", () => {
    const userPatch = {
      location: "test200",
      description: "test200",
      date_type: "test200",
    };
    return request(app)
      .patch("/api/user_ideas/64cbad8d6b10fda44f035345")
      .send(userPatch)
      .expect(200)
      .then(({ body }) => {
        expect(body.acknowledged).toBe(true);
      });
  });

  test("200: Responds with updated user idea object when all fields are changed", () => {
    const userPatch = {
      location: "test200",
      description: "test200",
      date_type: "test200",
      price: 0.2,
      opening_time: "00:02",
      closing_time: "00:02",
      img: "https://thisisatesturl.com",
    };
    return request(app)
      .patch("/api/user_ideas/64cbb729506422a470e61d34")
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
