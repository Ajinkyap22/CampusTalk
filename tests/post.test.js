const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
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
    .field("text", "Test text")
    .field("authorId", id)
    .field("forumId", forumId)
    .field("anonymous", true)
    .field("important", true)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      postId = res.body._id;

      expect(res.body).toMatchObject({
        text: "Test text",
        forum: forumId,
        anonymous: true,
        important: true,
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
            text: "Test text",
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
        text: "Test text",
        forum: forumId,
        anonymous: true,
        file: expect.stringMatching(/file/),
      });

      return done();
    });
});

// update a post
it("Edits a post", (done) => {
  request
    .put(`/api/forums/${forumId}/posts/update/${postId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Updated text",
      anonymous: false,
      important: false,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        text: "Updated text",
        forum: forumId,
        anonymous: false,
        important: false,
        file: expect.stringMatching(/file/),
      });

      return done();
    });
});

// upvotes a post
it("Upvotes a post", (done) => {
  request
    .put(`/api/forums/${forumId}/posts/upvote/${postId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      id,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        upvotes: expect.arrayContaining([id]),
      });

      return done();
    });
});

// downvotes a post
it("downvotes a post", (done) => {
  request
    .put(`/api/forums/${forumId}/posts/downvote/${postId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      id,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        downvotes: expect.arrayContaining([id]),
        upvotes: expect.arrayContaining([]),
      });

      return done();
    });
});

// pin a post
it("pins a post", (done) => {
  request
    .put(`/api/forums/${forumId}/posts/pin/${postId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        pinned: true,
      });

      return done();
    });
});

// unpin a post
it("pins a post", (done) => {
  request
    .put(`/api/forums/${forumId}/posts/unpin/${postId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        pinned: false,
      });

      return done();
    });
});

// delete a post
it("delete a post", (done) => {
  request
    .delete(`/api/forums/${forumId}/posts/delete/${postId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        text: "Updated text",
        forum: forumId,
        anonymous: false,
        file: expect.stringMatching(/file/),
      });

      return done();
    });
});
