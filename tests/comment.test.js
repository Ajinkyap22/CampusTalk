const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
// const comment = require("../models/comment");
jest.setTimeout(10000);
let token, id, forumId, postId, commentId, path;

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

beforeAll((done) => {
  request
    .post(`/api/forums/${forumId}/posts/create-post`)
    .set("Authorization", `Bearer ${token}`)
    .attach("file", "./public/images/logo.png")
    .field("title", "Test title")
    .field("text", "Test text")
    .field("authorId", id)
    .field("forumId", forumId)
    .end((err, res) => {
      if (err) return done(err);

      postId = res.body._id;
      path = `/api/forums/${forumId}/posts/${postId}/comments`;

      return done();
    });
});

// create comment
it("Create a comment", (done) => {
  request
    .post(`${path}/create-comment`)
    .set("Authorization", `Bearer ${token}`)
    .attach("file", "./public/images/logo.png")
    .field("text", "Test text")
    .field("authorId", id)
    .field("postId", postId)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      commentId = res.body.comment._id;

      expect(res.body.comment).toMatchObject({
        text: "Test text",
        file: expect.stringMatching(/file/),
      });

      return done();
    });
});

// get all comments
it("Retrieves all comments", (done) => {
  request
    .get(`${path}/`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            text: "Test text",
            _id: commentId,
            file: expect.stringMatching(/file/),
          }),
        ])
      );

      return done();
    });
});

// get single comment
it("Retrieves a single comment", (done) => {
  request
    .get(`${path}/${commentId}`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        text: "Test text",
        _id: commentId,
        file: expect.stringMatching(/file/),
      });

      return done();
    });
});

// // edit a comment
it("Edits a single comment", (done) => {
  request
    .put(`${path}/${commentId}/edit-comment`)
    .send({
      text: "Updated text",
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        text: "Updated text",
        _id: commentId,
        file: expect.stringMatching(/file/),
      });

      return done();
    });
});
