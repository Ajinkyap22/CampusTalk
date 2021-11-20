const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const User = require("../models/user");
jest.setTimeout(10000);
let token, id;

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
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      token = res.body.token;
      id = res.body.user._id;
      return done();
    });
});

// get user
it("Retreives a user", (done) => {
  request
    .get(`/api/users/${id}`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        email: "test@gmail.com",
      });

      return done();
    });
});

// update profile
it("Updates user profile", (done) => {
  request
    .put(`/api/users/profile/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .field("firstName", "Test")
    .field("lastName", "User")
    .field("email", "test@gmail.com")
    .attach("picture", "./public/images/logo.png")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        firstName: "Test",
        lastName: "User",
        email: "test@gmail.com",
        picture: expect.stringMatching(/picture/),
      });

      return done();
    });
});

// delete user
it("Deletes user", (done) => {
  request
    .delete(`/api/users/delete/${id}`)
    .expect("Content-Type", /json/)
    .expect(200, done);
});
