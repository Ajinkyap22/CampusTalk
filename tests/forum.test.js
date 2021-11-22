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

      token = res.body.token;
      id = res.body.user._id;
      return done(err);
    });
});

// get all forums
it("Retrieves all forums", (done) => {
  request
    .get("/api/forums")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

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
      user: id,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      forumId = res.body._id;
      return done();
    });
});

// get forum
it("Retrieves forum by id", (done) => {
  request
    .get(`/api/forums/${forumId}`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        forumName: "Demo Forum",
        email: "test@gmail.com",
        website: "www.testforum.com",
        address: "Test Address",
      });

      return done();
    });
});

// update a forum
it("Update a forum", (done) => {
  request
    .put(`/api/forums/update/${forumId}`)
    .set("Authorization", `Bearer ${token}`)
    .field("forumName", "Demo Forum")
    .field("email", "test@gmail.com")
    .field("website", "www.testforum.com")
    .field("address", "Test Address")
    .attach("picture", "./public/images/logo.png")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        forumName: "Demo Forum",
        email: "test@gmail.com",
        website: "www.testforum.com",
        address: "Test Address",
        picture: expect.stringMatching(/picture/),
      });
      return done();
    });
});

// add rule
it("Adds a forum rule", (done) => {
  request
    .post(`/api/forums/${forumId}/rules/add`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      rule: "No abusive language allowed",
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toEqual(
        expect.arrayContaining(["No abusive language allowed"])
      );
      return done();
    });
});

// get forum rules
it("Retrieves forum rules", (done) => {
  request
    .get(`/api/forums/${forumId}/rules`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toEqual(
        expect.arrayContaining(["No abusive language allowed"])
      );

      return done();
    });
});

// delete rules
it("Delete all rules", (done) => {
  request
    .delete(`/api/forums/${forumId}/rules/delete`)
    .set("Authorization", `Bearer ${token}`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toEqual([]);

      return done();
    });
});

// join forum
it("Join a forum", (done) => {
  request
    .post(`/api/forums/${forumId}/join`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      id: id,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            email: "test@gmail.com",
          }),
        ])
      );

      return done();
    });
});

// get members
it("Retrieves members of a forum", (done) => {
  request
    .get(`/api/forums/${forumId}/members`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            email: "test@gmail.com",
          }),
        ])
      );

      return done();
    });
});

// remove a member
it("Removes a member", (done) => {
  request
    .post(`/api/forums/${forumId}/members/delete`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      id: id,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toEqual([]);

      return done();
    });
});

// make moderator
it("Makes user moderator", (done) => {
  request
    .post(`/api/forums/${forumId}/moderators/make`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      id,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            email: "test@gmail.com",
            _id: id,
          }),
        ])
      );

      return done();
    });
});

// dismiss moderator
it("Dismisses moderator", (done) => {
  request
    .post(`/api/forums/${forumId}/moderators/dismiss`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      id,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toEqual([]);

      return done();
    });
});

// delete forum
it("Deletes a forum", (done) => {
  request
    .delete(`/api/forums/delete/${forumId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toMatchObject({
        forumName: "Demo Forum",
        email: "test@gmail.com",
        website: "www.testforum.com",
        address: "Test Address",
      });

      return done();
    });
});
