const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
jest.setTimeout(10000);
let token, id, forumId, postId, commentId, replyId, path;

const { setUpDB } = require("./test-setup");

setUpDB("forum");

// create user
beforeAll((done) => {
  request
    .post("/api/users/signup")
    .send({
      email: "demo1@gmail.com",
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

// create forums
beforeAll((done) => {
  request.get("/api/forums/").end((err, res) => {
    if (err) return done(err);

    forumId = res.body[0]._id;

    return done();
  });
});

// create post
beforeAll((done) => {
  request
    .post(`/api/forums/${forumId}/posts/create-post`)
    .set("Authorization", `Bearer ${token}`)
    .attach("file", "./public/images/logo.png")
    .field("text", "Test text")
    .field("authorId", id)
    .field("forumId", forumId)
    .end((err, res) => {
      if (err) return done(err);

      postId = res.body._id;

      return done();
    });
});

// create comment
beforeAll((done) => {
  request
    .post(`/api/forums/${forumId}/posts/${postId}/comments/create-comment`)
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
      path = `/api/forums/${forumId}/posts/${postId}/comments/${commentId}/replies`;

      return done();
    });
});

// create reply
it("Creates a reply", (done) => {
  request
    .post(`${path}/create-reply`)
    .set("Authorization", `Bearer ${token}`)
    .attach("file", "./public/images/logo.png")
    .field("text", "Test text")
    .field("authorId", id)
    .field("commentId", commentId)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      replyId = res.body.reply._id;

      expect(res.body.reply).toMatchObject({
        text: "Test text",
        file: expect.stringMatching(/file/),
        _id: replyId,
      });

      return done();
    });
});

// get all replies
it("Retrieves all replies", (done) => {
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
            _id: replyId,
            file: expect.stringMatching(/file/),
          }),
        ])
      );

      return done();
    });
});

// retrieve single reply
it("Retrieves a single reply", (done) => {
  request
    .get(`${path}/${replyId}`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        text: "Test text",
        _id: replyId,
        file: expect.stringMatching(/file/),
      });

      return done();
    });
});

// edit a reply
it("Edits a single reply", (done) => {
  request
    .put(`${path}/${replyId}/edit-reply`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      text: "Updated text",
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        text: "Updated text",
        _id: replyId,
        file: expect.stringMatching(/file/),
      });

      return done();
    });
});

// upvote reply
it("Upvotes a reply", (done) => {
  request
    .put(`${path}/${replyId}/upvote`)
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

// downvote reply
it("Downvotes a reply", (done) => {
  request
    .put(`${path}/${replyId}/downvote`)
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
      });

      return done();
    });
});

// delete reply
it("Deletes a reply", (done) => {
  request
    .delete(`${path}/${replyId}/delete-reply`)
    .set("Authorization", `Bearer ${token}`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        text: "Updated text",
        _id: replyId,
        file: expect.stringMatching(/file/),
      });

      return done();
    });
});
