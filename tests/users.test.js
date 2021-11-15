const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const databaseName = "user";
const User = require("../models/user");
jest.setTimeout(10000);

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
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

afterAll(async () => {
  await User.deleteMany();
});
