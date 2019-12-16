process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest")(app);
const chai = require("chai");
const { expect } = chai;
const connection = require("../db/connection");

beforeEach(() => {
  return connection.seed.run();
});

after(() => {
  connection.destroy();
});

describe("nc-news", () => {
  describe("/api", () => {
    describe("Invalid requests", () => {
      it("STATUS 404: sends Not found when requested an invalid path", () => {
        return request
          .get("/not-a-path")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Not found");
          });
      });
    });
    describe("/topics", () => {
      describe("GET", () => {
        it("STATUS 200: sends an array of topic objects, each containing a slug and description", () => {
          return request
            .get("/api/topics")
            .expect(200)
            .then(({ body: { topics } }) => {
              expect(topics).to.be.an("array");
              expect(topics[0]).to.have.all.keys("slug", "description");
            });
        });
      });
    });
    describe("/users", () => {
      describe("GET", () => {
        describe("/:username", () => {
          it("STATUS 200: sends the requested user object with username, avatar_url and name properties", () => {
            return request
              .get("/api/users/butter_bridge")
              .expect(200)
              .then(({ body: { user } }) => {
                expect(user).to.have.all.keys("username", "avatar_url", "name");
              });
          });
        });
        describe("/:username", () => {
          it("STATUS 404: sends an object with The user is not found message when requested a use that dose not exist", () => {
            return request
              .get("/api/users/0")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("User not found");
              });
          });
        });
      });
    });
    describe("/articles", () => {
      describe("GET", () => {
        it("STATUS 200: sends an article object with the following properties author, title, article_id, body, topic, created_at, votes, comment_count", () => {
          return request
            .get("/api/articles/1")
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article).to.have.keys(
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
            });
        });
        it("STATUS 404: sends 404 when requested an article that dose not exist", () => {
          return request
            .get("/api/articles/0")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("The article is not found");
            });
        });
      });
      describe("PATCH", () => {
        describe("/article_id", () => {
          it("STATUS 200: receives an object of inc_votes, updates the comments count and sends the updated article ", () => {
            return request
              .patch("/api/articles/1")
              .send({ inc_votes: 6 })
              .expect(201)
              .then(({ body: { updatedArticle } }) => {
                expect(updatedArticle).to.have.keys(
                  "article_id",
                  "title",
                  "body",
                  "topic",
                  "votes",
                  "author",
                  "created_at"
                );
                expect(updatedArticle.article_id).to.equal(1);
                expect(updatedArticle.votes).to.equal(106);
                expect(updatedArticle.author).to.equal("butter_bridge");
                expect(updatedArticle.topic).to.equal("mitch");
              });
          });
          it("STATUS 404: sends article not found message ", () => {
            return request
              .patch("/api/articles/999")
              .send({ inc_votes: 6 })
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Article is not found");
              });
          });
          it("STATUS 400: sends bad request when invalid article_id", () => {
            return request
              .patch("/api/articles/one")
              .send({ inc_votes: 6 })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Bad request");
              });
          });
        });
      });
    });
    describe("POST", () => {
      describe(":article_id/comments", () => {
        it("STATUS 201: creates article comments by article id", () => {
          return request
            .post("/api/articles/1/comments")
            .send({ username: "butter_bridge", body: "test comment" })
            .expect(201)
            .then(({ body: { postedComment } }) => {
              expect(postedComment).to.have.keys(
                "comment_id",
                "author",
                "article_id",
                "votes",
                "created_at",
                "body"
              );
              expect(postedComment.comment_id).to.equal(19);
              expect(postedComment.author).to.equal("butter_bridge");
              expect(postedComment.article_id).to.equal(1);
              expect(postedComment.body).to.equal("test comment");
            });
        });
      });
    });
    describe("GET", () => {
      describe(":article_id/comments", () => {});
    });
    describe("GET", () => {
      describe("/", () => {});
    });
  });
  describe("/comments", () => {
    describe("PATCH", () => {
      describe("/:comment_id", () => {});
    });
    describe("DELETE", () => {
      describe("/:comment_id", () => {
        it("STATUS 204: Deletes comment by comment_id ", () => {
          // return request.del("/api/comments/1").expect(204);
        });
      });
    });
  });
});
