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
          expect(user).toHaveProperty("full_name", expect.any(String));
          expect(user).toHaveProperty("email", expect.any(String));
        });
      });
  });
});

describe("GET - All ideas sorted by search(queries)", () => {
  test("200: Responds with ideas sorted by price desc to asc", () => {
    return request(app)
      .get("/api/search?sort_by=price&order=desc")
      .expect(200)
      .then(({ body }) => {
        body.forEach((idea) => {
          expect(idea).toHaveProperty("_id", expect.any(String));
          expect(idea).toHaveProperty("username", expect.any(String));
          expect(idea).toHaveProperty("title", expect.any(String));
          expect(idea).toHaveProperty("location", expect.any(String));
          expect(idea).toHaveProperty("address", expect.any(String));
          expect(idea).toHaveProperty("description", expect.any(String));
          expect(idea).toHaveProperty("type", expect.any(String));
          expect(idea).toHaveProperty("price", expect.any(Number));
          expect(idea).toHaveProperty("opening_time", expect.any(String));
          expect(idea).toHaveProperty("closing_time", expect.any(String));
          expect(idea).toHaveProperty("image_url", expect.any(String));

          expect(body).toBeSorted({ key: "price", descending: true });
        });
      });
  });
});
test("200: Responds with ideas sorted by price asc to desc", () => {
  return request(app)
    .get("/api/search?sort_by=price&order=asc")
    .expect(200)
    .then(({ body }) => {
      body.forEach((idea) => {
        expect(idea).toHaveProperty("_id", expect.any(String));
        expect(idea).toHaveProperty("username", expect.any(String));
        expect(idea).toHaveProperty("title", expect.any(String));
        expect(idea).toHaveProperty("location", expect.any(String));
        expect(idea).toHaveProperty("address", expect.any(String));
        expect(idea).toHaveProperty("description", expect.any(String));
        expect(idea).toHaveProperty("type", expect.any(String));
        expect(idea).toHaveProperty("price", expect.any(Number));
        expect(idea).toHaveProperty("opening_time", expect.any(String));
        expect(idea).toHaveProperty("closing_time", expect.any(String));
        expect(idea).toHaveProperty("image_url", expect.any(String));
        expect(body).toBeSorted({ key: "price", ascending: true });
      });
    });
});
test("200: Responds with ideas sorted by location desc as default when no queries are specified", () => {
  return request(app)
    .get("/api/search")
    .expect(200)
    .then(({ body }) => {
      body.forEach((idea) => {
        expect(idea).toHaveProperty("_id", expect.any(String));
        expect(idea).toHaveProperty("username", expect.any(String));
        expect(idea).toHaveProperty("title", expect.any(String));
        expect(idea).toHaveProperty("location", expect.any(String));
        expect(idea).toHaveProperty("address", expect.any(String));
        expect(idea).toHaveProperty("description", expect.any(String));
        expect(idea).toHaveProperty("type", expect.any(String));
        expect(idea).toHaveProperty("price", expect.any(Number));
        expect(idea).toHaveProperty("opening_time", expect.any(String));
        expect(idea).toHaveProperty("closing_time", expect.any(String));
        expect(idea).toHaveProperty("image_url", expect.any(String));
        expect(body).toBeSorted({ key: "location", descending: true });
      });
    });
});
test("200: Responds with ideas sorted by location asc when order is set to asc and sort by is set to location", () => {
  return request(app)
    .get("/api/search/?sort_by=location&order=asc")
    .expect(200)
    .then(({ body }) => {
      body.forEach((idea) => {
        expect(idea).toHaveProperty("_id", expect.any(String));
        expect(idea).toHaveProperty("username", expect.any(String));
        expect(idea).toHaveProperty("title", expect.any(String));
        expect(idea).toHaveProperty("location", expect.any(String));
        expect(idea).toHaveProperty("address", expect.any(String));
        expect(idea).toHaveProperty("description", expect.any(String));
        expect(idea).toHaveProperty("type", expect.any(String));
        expect(idea).toHaveProperty("price", expect.any(Number));
        expect(idea).toHaveProperty("opening_time", expect.any(String));
        expect(idea).toHaveProperty("closing_time", expect.any(String));
        expect(idea).toHaveProperty("image_url", expect.any(String));
        expect(body).toBeSorted({ key: "location", ascending: true });
      });
    });
});
test("200: Responds with ideas sorted by date type asc when order is set to asc and sort by is set to date type", () => {
  return request(app)
    .get("/api/search/?sort_by=type&order=asc")
    .expect(200)
    .then(({ body }) => {
      body.forEach((idea) => {
        expect(idea).toHaveProperty("_id", expect.any(String));
        expect(idea).toHaveProperty("username", expect.any(String));
        expect(idea).toHaveProperty("title", expect.any(String));
        expect(idea).toHaveProperty("location", expect.any(String));
        expect(idea).toHaveProperty("address", expect.any(String));
        expect(idea).toHaveProperty("description", expect.any(String));
        expect(idea).toHaveProperty("type", expect.any(String));
        expect(idea).toHaveProperty("price", expect.any(Number));
        expect(idea).toHaveProperty("opening_time", expect.any(String));
        expect(idea).toHaveProperty("closing_time", expect.any(String));
        expect(idea).toHaveProperty("image_url", expect.any(String));
        expect(body).toBeSorted({ key: "type", ascending: true });
      });
    });
});
test("200: Responds with specific location sorted by date type default desc", () => {
  return request(app)
    .get("/api/search?location=night&sort_by=price&order=asc")
    .expect(200)
    .then(({ body }) => {
      body.forEach((idea) => {
        expect(idea).toHaveProperty("_id", expect.any(String));
        expect(idea).toHaveProperty("username", expect.any(String));
        expect(idea).toHaveProperty("title", expect.any(String));
        expect(idea).toHaveProperty("location", "night");
        expect(idea).toHaveProperty("address", expect.any(String));
        expect(idea).toHaveProperty("description", expect.any(String));
        expect(idea).toHaveProperty("type", expect.any(String));
        expect(idea).toHaveProperty("price", expect.any(Number));
        expect(idea).toHaveProperty("opening_time", expect.any(String));
        expect(idea).toHaveProperty("closing_time", expect.any(String));
        expect(idea).toHaveProperty("image_url", expect.any(String));
        expect(body).toBeSorted({ key: "type", descending: true });
      });
    });
});
test("200: Responds with specific location sorted by date type asc", () => {
  return request(app)
    .get("/api/search?location=night&sort_by=price&order=asc")
    .expect(200)
    .then(({ body }) => {
      body.forEach((idea) => {
        expect(idea).toHaveProperty("_id", expect.any(String));
        expect(idea).toHaveProperty("username", expect.any(String));
        expect(idea).toHaveProperty("title", expect.any(String));
        expect(idea).toHaveProperty("location", "night");
        expect(idea).toHaveProperty("address", expect.any(String));
        expect(idea).toHaveProperty("description", expect.any(String));
        expect(idea).toHaveProperty("type", expect.any(String));
        expect(idea).toHaveProperty("price", expect.any(Number));
        expect(idea).toHaveProperty("opening_time", expect.any(String));
        expect(idea).toHaveProperty("closing_time", expect.any(String));
        expect(idea).toHaveProperty("image_url", expect.any(String));
        expect(body).toBeSorted({ key: "type", ascending: true });
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
        expect(body).toHaveProperty("full_name", expect.any(String));
        expect(body).toHaveProperty("email", expect.any(String));
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
          expect(idea).toHaveProperty("title", expect.any(String));
          expect(idea).toHaveProperty("location", expect.any(String));
          expect(idea).toHaveProperty("address", expect.any(String));
          expect(idea).toHaveProperty("description", expect.any(String));
          expect(idea).toHaveProperty("type", expect.any(String));
          expect(idea).toHaveProperty("price", expect.any(Number));
          expect(idea).toHaveProperty("opening_time", expect.any(String));
          expect(idea).toHaveProperty("closing_time", expect.any(String));
          expect(idea).toHaveProperty("image_url", expect.any(String));
        });
      });
  });
  test("200: Responds with ideas array of users idea objects sorted by location (default) in descending (default) order:", () => {
    return request(app)
      .get("/api/user_ideas?sort_by=location&order=desc")
      .expect(200)
      .then(({ body }) => {
        body.ideas.forEach((idea) => {
          expect(idea).toHaveProperty("_id", expect.any(String));
          expect(idea).toHaveProperty("username", expect.any(String));
          expect(idea).toHaveProperty("title", expect.any(String));
          expect(idea).toHaveProperty("location", expect.any(String));
          expect(idea).toHaveProperty("address", expect.any(String));
          expect(idea).toHaveProperty("description", expect.any(String));
          expect(idea).toHaveProperty("type", expect.any(String));
          expect(idea).toHaveProperty("price", expect.any(Number));
          expect(idea).toHaveProperty("opening_time", expect.any(String));
          expect(idea).toHaveProperty("closing_time", expect.any(String));
          expect(idea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body.ideas).toBeSorted({ key: "location", descending: true });
      });
  });
  test("200: Responds with ideas array of users idea objects sorted by location in ascending order:", () => {
    return request(app)
      .get("/api/user_ideas?sort_by=location&order=asc")
      .expect(200)
      .then(({ body }) => {
        body.ideas.forEach((idea) => {
          expect(idea).toHaveProperty("_id", expect.any(String));
          expect(idea).toHaveProperty("username", expect.any(String));
          expect(idea).toHaveProperty("title", expect.any(String));
          expect(idea).toHaveProperty("location", expect.any(String));
          expect(idea).toHaveProperty("address", expect.any(String));
          expect(idea).toHaveProperty("description", expect.any(String));
          expect(idea).toHaveProperty("type", expect.any(String));
          expect(idea).toHaveProperty("price", expect.any(Number));
          expect(idea).toHaveProperty("opening_time", expect.any(String));
          expect(idea).toHaveProperty("closing_time", expect.any(String));
          expect(idea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body.ideas).toBeSorted({ key: "location", ascending: true });
      });
  });
  test("200: Responds with ideas array of users idea objects sorted by createdAt in descending order:", () => {
    return request(app)
      .get("/api/user_ideas?sort_by=createdAt&order=desc")
      .expect(200)
      .then(({ body }) => {
        body.ideas.forEach((idea) => {
          expect(idea).toHaveProperty("_id", expect.any(String));
          expect(idea).toHaveProperty("username", expect.any(String));
          expect(idea).toHaveProperty("title", expect.any(String));
          expect(idea).toHaveProperty("location", expect.any(String));
          expect(idea).toHaveProperty("address", expect.any(String));
          expect(idea).toHaveProperty("createdAt");
          expect(idea).toHaveProperty("description", expect.any(String));
          expect(idea).toHaveProperty("type", expect.any(String));
          expect(idea).toHaveProperty("price", expect.any(Number));
          expect(idea).toHaveProperty("opening_time", expect.any(String));
          expect(idea).toHaveProperty("closing_time", expect.any(String));
          expect(idea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body.ideas).toBeSorted({ key: "createdAt", descending: true });
      });
  });
  test("200: Responds with ideas array of users idea objects sorted by price in ascending order:", () => {
    return request(app)
      .get("/api/user_ideas?sort_by=price&order=asc")
      .expect(200)
      .then(({ body }) => {
        body.ideas.forEach((idea) => {
          expect(idea).toHaveProperty("_id", expect.any(String));
          expect(idea).toHaveProperty("username", expect.any(String));
          expect(idea).toHaveProperty("title", expect.any(String));
          expect(idea).toHaveProperty("location", expect.any(String));
          expect(idea).toHaveProperty("address", expect.any(String));
          expect(idea).toHaveProperty("description", expect.any(String));
          expect(idea).toHaveProperty("type", expect.any(String));
          expect(idea).toHaveProperty("price", expect.any(Number));
          expect(idea).toHaveProperty("opening_time", expect.any(String));
          expect(idea).toHaveProperty("closing_time", expect.any(String));
          expect(idea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body.ideas).toBeSorted({ key: "price", ascending: true });
      });
  });
  test("200: Responds with ideas array of users idea objects sorted by price in descending order:", () => {
    return request(app)
      .get("/api/user_ideas?sort_by=price&order=desc")
      .expect(200)
      .then(({ body }) => {
        body.ideas.forEach((idea) => {
          expect(idea).toHaveProperty("_id", expect.any(String));
          expect(idea).toHaveProperty("username", expect.any(String));
          expect(idea).toHaveProperty("title", expect.any(String));
          expect(idea).toHaveProperty("location", expect.any(String));
          expect(idea).toHaveProperty("address", expect.any(String));
          expect(idea).toHaveProperty("description", expect.any(String));
          expect(idea).toHaveProperty("type", expect.any(String));
          expect(idea).toHaveProperty("price", expect.any(Number));
          expect(idea).toHaveProperty("opening_time", expect.any(String));
          expect(idea).toHaveProperty("closing_time", expect.any(String));
          expect(idea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body.ideas).toBeSorted({ key: "price", descending: true });
      });
  });
  test("200: Responds with ideas array of users idea objects sorted by type in ascending order:", () => {
    return request(app)
      .get("/api/user_ideas?sort_by=type&order=asc")
      .expect(200)
      .then(({ body }) => {
        body.ideas.forEach((idea) => {
          expect(idea).toHaveProperty("_id", expect.any(String));
          expect(idea).toHaveProperty("username", expect.any(String));
          expect(idea).toHaveProperty("title", expect.any(String));
          expect(idea).toHaveProperty("location", expect.any(String));
          expect(idea).toHaveProperty("address", expect.any(String));
          expect(idea).toHaveProperty("description", expect.any(String));
          expect(idea).toHaveProperty("type", expect.any(String));
          expect(idea).toHaveProperty("price", expect.any(Number));
          expect(idea).toHaveProperty("opening_time", expect.any(String));
          expect(idea).toHaveProperty("closing_time", expect.any(String));
          expect(idea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body.ideas).toBeSorted({ key: "type", ascending: true });
      });
  });
  test("200: Responds with ideas array of users idea objects sorted by type in descending order:", () => {
    return request(app)
      .get("/api/user_ideas?sort_by=type&order=desc")
      .expect(200)
      .then(({ body }) => {
        body.ideas.forEach((idea) => {
          expect(idea).toHaveProperty("_id", expect.any(String));
          expect(idea).toHaveProperty("username", expect.any(String));
          expect(idea).toHaveProperty("title", expect.any(String));
          expect(idea).toHaveProperty("location", expect.any(String));
          expect(idea).toHaveProperty("address", expect.any(String));
          expect(idea).toHaveProperty("description", expect.any(String));
          expect(idea).toHaveProperty("type", expect.any(String));
          expect(idea).toHaveProperty("price", expect.any(Number));
          expect(idea).toHaveProperty("opening_time", expect.any(String));
          expect(idea).toHaveProperty("closing_time", expect.any(String));
          expect(idea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body.ideas).toBeSorted({ key: "type", descending: true });
      });
  });
});

describe("GET /api/user_ideas/:_id", () => {
  test("Should return idea that corresponds to a given idea id", () => {
    return request(app)
      .get("/api/user_ideas/64d0ebb81a8ffe5e75c08b47")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("_id", expect.any(String));
        expect(body).toHaveProperty("username", expect.any(String));
        expect(body).toHaveProperty("title", expect.any(String));
        expect(body).toHaveProperty("location", expect.any(String));
        expect(body).toHaveProperty("address", expect.any(String));
        expect(body).toHaveProperty("description", expect.any(String));
        expect(body).toHaveProperty("type", expect.any(String));
        expect(body).toHaveProperty("price", expect.any(Number));
        expect(body).toHaveProperty("opening_time", expect.any(String));
        expect(body).toHaveProperty("closing_time", expect.any(String));
        expect(body).toHaveProperty("image_url", expect.any(String));
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
      full_name: "lit piazza",
      email: "piazza@gmail.com",
    };
    return request(app)
      .post("/api/users")
      .send(testUser)
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty("_id", expect.any(String));
        expect(body).toHaveProperty("username", expect.any(String));
        expect(body).toHaveProperty("password", expect.any(String));
        expect(body).toHaveProperty("full_name", expect.any(String));
        expect(body).toHaveProperty("email", expect.any(String));
      });
  });

  test("Should respond with status 400, when a user is trying to sign up but leaves username blank", () => {
    const newUser = {
      username: "",
      password: "heymatey",
      full_name: "martin odegaard",
      email: "mg1@gmail.com",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "username cannot be blank and must be at least 3 characters long"
        );
      });
  });

  test("Should respond with status 400, when a user is trying to sign up but leaves password blank", () => {
    const newUser = {
      username: "ronaldo",
      password: "",
      full_name: "martin odegaard",
      email: "mg1@gmail.com",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "password cannot be blank and must be at least 3 characters long"
        );
      });
  });
});
describe("Post - create a new user idea:", () => {
  test("201: Responds with created user Idea:", () => {
    const testUserIdea = {
      username: "br15",
      title: "test",
      location: "night",
      address: "Henley street 113",
      description:
        "test is something that is very important in coding and ensures good quality code and best practice. It reduces bugs but increases development time",
      type: "test",
      price: 0.0,
      latitude: 54.8957,
      longitude: 45.345,
      opening_time: "00:00",
      closing_time: "00:00",
      image_url: "url",
    };
    return request(app)
      .post("/api/user_ideas")
      .send(testUserIdea)
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty("_id", expect.any(String));
        expect(body).toHaveProperty("username", expect.any(String));
        expect(body).toHaveProperty("location", expect.any(String));
        expect(body).toHaveProperty("address", expect.any(String));
        expect(body).toHaveProperty("description", expect.any(String));
        expect(body).toHaveProperty("type", expect.any(String));
        expect(body).toHaveProperty("price", expect.any(Number));
        expect(body).toHaveProperty("latitude", expect.any(Number));
        expect(body).toHaveProperty("longitude", expect.any(Number));
        expect(body).toHaveProperty("opening_time", expect.any(String));
        expect(body).toHaveProperty("closing_time", expect.any(String));
        expect(body).toHaveProperty("image_url", expect.any(String));
      });
  });

  test("Should respond with status 400, when a user is trying to create a date idea but does not fill the necessary fields", () => {
    const testUserIdea = {
      username: "br15",
      title: "test",
      location: "",
      address: "Henley street replublic",
      description: "test",
      type: "test",
      price: 0.0,
      latitude: 54.8957,
      longitude: 45.345,
      opening_time: "00:00",
      closing_time: "00:00",
      image_url: "url",
    };
    return request(app)
      .post("/api/user_ideas")
      .send(testUserIdea)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("location cannot be blank");
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
      full_name: "litty banana",
    };
    return request(app)
      .patch("/api/users/br15")
      .send(userPatch)
      .expect(200)
      .then(({ body }) => {
        expect(body.acknowledged).toBe(true);
      });
  });

  test("200: Responds with updated user object when password is changed", () => {
    const userPatch = {
      password: "pizzahut",
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
      full_name: "johnson burger",
      email: "pizzamama999@gmail.com",
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
      type: "test200",
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
      address: "henly bold street",
      description: "test200",
      type: "test200",
      price: 0.2,
      opening_time: "00:02",
      closing_time: "00:02",
      image_url: "https://thisisatesturl.com",
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

describe("POST - posts a date idea to favourites:", () => {
  test("200: Responds with idea object when added to favourites", () => {
    return request(app)
      .post(
        "/api/user_ideas/favourites/64ca63064fa62df6204f62fd/64d0eba2291ba2ee1a698b52"
      )
      .expect(200)
      .then(({ body }) => {
        body.favourites.forEach((favedIdea) => {
          expect(favedIdea).toHaveProperty("_id", expect.any(String));
          expect(favedIdea).toHaveProperty("username", expect.any(String));
          expect(favedIdea).toHaveProperty("title", expect.any(String));
          expect(favedIdea).toHaveProperty("location", expect.any(String));
          expect(favedIdea).toHaveProperty("address", expect.any(String));
          expect(favedIdea).toHaveProperty("description", expect.any(String));
          expect(favedIdea).toHaveProperty("type", expect.any(String));
          expect(favedIdea).toHaveProperty("price", expect.any(Number));
          expect(favedIdea).toHaveProperty("opening_time", expect.any(String));
          expect(favedIdea).toHaveProperty("closing_time", expect.any(String));
          expect(favedIdea).toHaveProperty("image_url", expect.any(String));
        });
      });
  });
  test("200: Responds with all user favourite ideas ", () => {
    return request(app)
      .get("/api/user/favourites/64ca63064fa62df6204f62fd")
      .expect(200)
      .then(({ body }) => {
        body.forEach((favedIdea) => {
          expect(favedIdea).toHaveProperty("_id", expect.any(String));
          expect(favedIdea).toHaveProperty("username", expect.any(String));
          expect(favedIdea).toHaveProperty("title", expect.any(String));
          expect(favedIdea).toHaveProperty("location", expect.any(String));
          expect(favedIdea).toHaveProperty("address", expect.any(String));
          expect(favedIdea).toHaveProperty("description", expect.any(String));
          expect(favedIdea).toHaveProperty("type", expect.any(String));
          expect(favedIdea).toHaveProperty("price", expect.any(Number));
          expect(favedIdea).toHaveProperty("opening_time", expect.any(String));
          expect(favedIdea).toHaveProperty("closing_time", expect.any(String));
          expect(favedIdea).toHaveProperty("image_url", expect.any(String));
        });
      });
  });
  test("200: Responds with all user favourite ideas sorted by price in descending order ", () => {
    return request(app)
      .get(
        "/api/user/favourites/64ca63064fa62df6204f62fd?sort_by=price&order=desc"
      )
      .expect(200)
      .then(({ body }) => {
        body.forEach((favedIdea) => {
          expect(favedIdea).toHaveProperty("_id", expect.any(String));
          expect(favedIdea).toHaveProperty("username", expect.any(String));
          expect(favedIdea).toHaveProperty("title", expect.any(String));
          expect(favedIdea).toHaveProperty("location", expect.any(String));
          expect(favedIdea).toHaveProperty("address", expect.any(String));
          expect(favedIdea).toHaveProperty("description", expect.any(String));
          expect(favedIdea).toHaveProperty("type", expect.any(String));
          expect(favedIdea).toHaveProperty("price", expect.any(Number));
          expect(favedIdea).toHaveProperty("opening_time", expect.any(String));
          expect(favedIdea).toHaveProperty("closing_time", expect.any(String));
          expect(favedIdea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body).toBeSorted({ key: "price", descending: true });
      });
  });
  test("200: Responds with all user favourite ideas sorted by price in ascending order ", () => {
    return request(app)
      .get(
        "/api/user/favourites/64ca63064fa62df6204f62fd?sort_by=price&order=desc"
      )
      .expect(200)
      .then(({ body }) => {
        body.forEach((favedIdea) => {
          expect(favedIdea).toHaveProperty("_id", expect.any(String));
          expect(favedIdea).toHaveProperty("username", expect.any(String));
          expect(favedIdea).toHaveProperty("title", expect.any(String));
          expect(favedIdea).toHaveProperty("location", expect.any(String));
          expect(favedIdea).toHaveProperty("address", expect.any(String));
          expect(favedIdea).toHaveProperty("description", expect.any(String));
          expect(favedIdea).toHaveProperty("type", expect.any(String));
          expect(favedIdea).toHaveProperty("price", expect.any(Number));
          expect(favedIdea).toHaveProperty("opening_time", expect.any(String));
          expect(favedIdea).toHaveProperty("closing_time", expect.any(String));
          expect(favedIdea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body).toBeSorted({ key: "price", ascending: true });
      });
  });
  test("200: Responds with all user favourite ideas sorted by location in descending order ", () => {
    return request(app)
      .get(
        "/api/user/favourites/64ca63064fa62df6204f62fd?sort_by=price&order=desc"
      )
      .expect(200)
      .then(({ body }) => {
        body.forEach((favedIdea) => {
          expect(favedIdea).toHaveProperty("_id", expect.any(String));
          expect(favedIdea).toHaveProperty("username", expect.any(String));
          expect(favedIdea).toHaveProperty("title", expect.any(String));
          expect(favedIdea).toHaveProperty("location", expect.any(String));
          expect(favedIdea).toHaveProperty("address", expect.any(String));
          expect(favedIdea).toHaveProperty("description", expect.any(String));
          expect(favedIdea).toHaveProperty("type", expect.any(String));
          expect(favedIdea).toHaveProperty("price", expect.any(Number));
          expect(favedIdea).toHaveProperty("opening_time", expect.any(String));
          expect(favedIdea).toHaveProperty("closing_time", expect.any(String));
          expect(favedIdea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body).toBeSorted({ key: "location", descending: true });
      });
  });
  test("200: Responds with all user favourite ideas sorted by location in ascending order ", () => {
    return request(app)
      .get(
        "/api/user/favourites/64ca63064fa62df6204f62fd?sort_by=price&order=desc"
      )
      .expect(200)
      .then(({ body }) => {
        body.forEach((favedIdea) => {
          expect(favedIdea).toHaveProperty("_id", expect.any(String));
          expect(favedIdea).toHaveProperty("username", expect.any(String));
          expect(favedIdea).toHaveProperty("title", expect.any(String));
          expect(favedIdea).toHaveProperty("location", expect.any(String));
          expect(favedIdea).toHaveProperty("address", expect.any(String));
          expect(favedIdea).toHaveProperty("description", expect.any(String));
          expect(favedIdea).toHaveProperty("type", expect.any(String));
          expect(favedIdea).toHaveProperty("price", expect.any(Number));
          expect(favedIdea).toHaveProperty("opening_time", expect.any(String));
          expect(favedIdea).toHaveProperty("closing_time", expect.any(String));
          expect(favedIdea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body).toBeSorted({ key: "location", ascending: true });
      });
  });
  test("200: Responds with all user favourite ideas sorted by type in descending order ", () => {
    return request(app)
      .get(
        "/api/user/favourites/64ca63064fa62df6204f62fd?sort_by=price&order=desc"
      )
      .expect(200)
      .then(({ body }) => {
        body.forEach((favedIdea) => {
          expect(favedIdea).toHaveProperty("_id", expect.any(String));
          expect(favedIdea).toHaveProperty("username", expect.any(String));
          expect(favedIdea).toHaveProperty("title", expect.any(String));
          expect(favedIdea).toHaveProperty("location", expect.any(String));
          expect(favedIdea).toHaveProperty("address", expect.any(String));
          expect(favedIdea).toHaveProperty("description", expect.any(String));
          expect(favedIdea).toHaveProperty("type", expect.any(String));
          expect(favedIdea).toHaveProperty("price", expect.any(Number));
          expect(favedIdea).toHaveProperty("opening_time", expect.any(String));
          expect(favedIdea).toHaveProperty("closing_time", expect.any(String));
          expect(favedIdea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body).toBeSorted({ key: "type", descending: true });
      });
  });
  test("200: Responds with all user favourite ideas sorted by type in ascending order ", () => {
    return request(app)
      .get(
        "/api/user/favourites/64ca63064fa62df6204f62fd?sort_by=price&order=desc"
      )
      .expect(200)
      .then(({ body }) => {
        body.forEach((favedIdea) => {
          expect(favedIdea).toHaveProperty("_id", expect.any(String));
          expect(favedIdea).toHaveProperty("username", expect.any(String));
          expect(favedIdea).toHaveProperty("title", expect.any(String));
          expect(favedIdea).toHaveProperty("location", expect.any(String));
          expect(favedIdea).toHaveProperty("address", expect.any(String));
          expect(favedIdea).toHaveProperty("description", expect.any(String));
          expect(favedIdea).toHaveProperty("type", expect.any(String));
          expect(favedIdea).toHaveProperty("price", expect.any(Number));
          expect(favedIdea).toHaveProperty("opening_time", expect.any(String));
          expect(favedIdea).toHaveProperty("closing_time", expect.any(String));
          expect(favedIdea).toHaveProperty("image_url", expect.any(String));
        });
        expect(body).toBeSorted({ key: "type", ascending: true });
      });
  });
});

afterAll(() => {
  db.end();
});
