const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const User = require("../models/user");
const forum = require("../models/forum");
jest.setTimeout(10000);
let token, id, forumId;

const { setUpDB } = require("./test-setup");

setUpDB("forum");

beforeAll((done) => {
  request
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test1234",
      confirmPassword: "test1234",
    })
    .end((err, res) => {
      if (err) return done(err);
      else {
        token = res.body.token;
        id = res.body.user._id;
        return done(err);
      }
    });
});

// get all forums
it("Retrives all forums", (done) => {
  request
    .get("/api/forums")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      else {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              forumName: "Test Forum",
              email: "testing1@gmail.com",
              website: "www.test.com",
              address: "12345678",
            }),
          ])
        );

        return done();
      }
    });
});

// create forum
it("Creates new forum", (done) => {
  request
    .post("/api/forums/create-forum")
    .set("Authorization", `Bearer ${token}`)
    .send({
      forumName: "Demo Forum",
      email: "test@gmail.com",
      website: "www.testforum.com",
      address: "Test Address",
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      else {
        forumId = res.body._id;
        return done();
      }
    });
});

// get forum
it("Retrives forum by id", (done) => {
  request
    .get(`/api/forums/${forumId}`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      else {
        expect(res.body).toMatchObject({
          forumName: "Demo Forum",
          email: "test@gmail.com",
          website: "www.testforum.com",
          address: "Test Address",
        });

        return done();
      }
    });
});
