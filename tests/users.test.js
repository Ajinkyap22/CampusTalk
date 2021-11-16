const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const User = require("../models/user");
jest.setTimeout(10000);

const { setUpDB } = require("./test-setup");

setUpDB("user");

it("Seeding test", async () => {
  const users = await User.find();
  expect(users.length).toBe(3);
});

it("Sign up", (done) => {
  request
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test1234",
      confirmPassword: "test1234",
    })
    .expect("Content-Type", /json/)
    .expect(200, done);
});

// get users
it("Gets all the users from database", (done) => {
  request.get("/api/users/").expect("Content-Type", /json/).expect(200, done);
});

// login
it("Login", (done) => {
  request
    .post("/api/users/login")
    .send({
      email: "test@gmail.com",
      password: "test1234",
    })
    .expect("Content-Type", /json/)
    .expect(200, done);
});

// delete user

// update profile
