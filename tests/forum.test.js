const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const User = require("../models/user");
const forum = require("../models/forum");
jest.setTimeout(10000);
// let token, id;

const { setUpDB } = require("./test-setup");

setUpDB("forum");

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
  // request.post("/api/forums/create");
});
