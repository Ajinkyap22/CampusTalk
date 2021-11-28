const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const User = require("../models/user");
const forum = require("../models/forum");
const post = require("../models/post");
jest.setTimeout(10000);
let token, id, forumId, postId;

const { setUpDB } = require("./test-setup");

setUpDB("forum");

beforeAll((done) => {
  request
    .post("/api/users/signup")
    .send({
      email: "demo@gmail.com",
      password: "demo1234",
      confirmPassword: "demo1234",
    })
    .end((err, res) => {
      if (err) return done(err);

      token = res.body.token;
      id = res.body.user._id;

      return done();
    });
});

beforeAll((done) => {
  request.get("/api/forums/").end((err, res) => {
    if (err) return done(err);

    forumId = res.body[0]._id;

    return done();
  });
});

// create a post
it("Creates a post", (done) => {
  request
    .post(`/api/forums/${forumId}/posts/create-post`)
    .set("Authorization", `Bearer ${token}`)
    .attach("file", "./public/images/logo.png")
    .field("title", "Test title")
    .field("text", "Test text")
    .field("authorId", id)
    .field("forumId", forumId)
    .field("anonymous", true)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      postId = res.body._id;

      expect(res.body).toMatchObject({
        title: "Test title",
        text: "Test text",
        forum: forumId,
        anonymous: true,
        file: expect.stringMatching(/file/),
      });

      return done();
    });
});

// get all posts
it("Gets all posts", (done) => {
  request
    .get(`/api/forums/${forumId}/posts/`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "Test title",
            text: "Test text",
            forum: forumId,
            anonymous: true,
            file: expect.stringMatching(/file/),
          }),
        ])
      );
      return done();
    });
});

// get single post
it("Gets all posts", (done) => {
  request
    .get(`/api/forums/${forumId}/posts/${postId}`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        title: "Test title",
        text: "Test text",
        forum: forumId,
        anonymous: true,
        file: expect.stringMatching(/file/),
      });

      return done();
    });
});
