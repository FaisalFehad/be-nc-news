process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest")(app);
const chai = require("chai");
const { expect } = chai;
const connection = require("../db/connection");
chai.use(require("chai-sorted"));

beforeEach(() => {
  return connection.seed.run();
});

after(() => {
  connection.destroy();
});

describe("nc-news", () => {
  describe("/api", () => {
    describe("Delete", () => {
      it("418: responds with I'm a teapot to delete request", () => {
        return request.delete("/api").expect(418);
      });
    });
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
      describe("ERRORS", () => {
        describe("Invalid Methods", () => {
          it("STATUS 405: responds to handles invalid methods", () => {
            const invalidMethods = ["put", "delete", "patch", "post"];
            const methodPromises = invalidMethods.map(method => {
              return request[method]("/api/topics")
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("Method Not Allowed");
                });
            });
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
        describe("ERRORS", () => {
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
        it("STATUS 405: handles invalid methods", () => {
          const invalidMethods = ["patch", "put", "delete", "post"];
          const methodPromises = invalidMethods.map(method => {
            return request[method]("/api/users/butter_bridge")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Method Not Allowed");
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
        describe("ERRORS", () => {
          it("STATUS 404: sends 404 when requested an article that dose not exist", () => {
            return request
              .get("/api/articles/900")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("The article is not found");
              });
          });
          it("STATUS 400: responds with bad request to invalid article id", () => {
            return request
              .get("/api/articles/ten")
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Bad request");
              });
          });
        });
      });
      it("STATUS 405: handles invalid methods", () => {
        const invalidMethods = ["put", "delete"];
        const methodPromises = invalidMethods.map(method => {
          return request[method]("/api/articles/1")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method Not Allowed");
            });
        });
      });
      describe("/article_id", () => {
        describe("PATCH", () => {
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
    describe(":article_id/comments", () => {
      describe("POST", () => {
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
        it("STATUS 422: sends Unprocessable Entity when article id is valid but dose not exist", () => {
          return request
            .post("/api/articles/999/comments")
            .send({ username: "butter_bridge", body: "test comment" })
            .expect(422)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Unprocessable Entity");
            });
        });
        it("STATUS 400: sends bad request msg when the article_id is not valid", () => {
          return request
            .post("/api/articles/one/comments")
            .send({ username: "butter_bridge", body: "test comment" })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad request");
            });
        });
        it("STATUS 400: sends bad request msg when missing the username", () => {
          return request
            .post("/api/articles/one/comments")
            .send({ body: "test comment" })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad request");
            });
        });
        it("STATUS 400: sends bad request msg when missing the comment body", () => {
          return request
            .post("/api/articles/one/comments")
            .send({ username: "butter_bridge" })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad request");
            });
        });
        it("STATUS 400: sends bad request msg when sending an empty object", () => {
          return request
            .post("/api/articles/one/comments")
            .send({})
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad request");
            });
        });
        it("STATUS 400: sends bad request msg when an extra property that dose not exist in the db", () => {
          return request
            .post("/api/articles/one/comments")
            .send({
              username: "butter_bridge",
              body: "test comment",
              admin: "meee"
            })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad request");
            });
        });
      });
    });
    describe(":article_id/comments", () => {
      describe("GET", () => {
        it("STATUS 200: responds with array of comments", () => {
          return request
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body).to.be.an("array");
              expect(body[0]).to.have.all.keys(
                "comment_id",
                "votes",
                "created_at",
                "username",
                "body"
              );
            });
        });
        it("STATUS 200: each item of the array contains comment object", () => {
          return request
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body[0]).to.have.all.keys(
                "comment_id",
                "votes",
                "created_at",
                "username",
                "body"
              );
            });
        });
        it("STATUS 200: responds with an empty array when requested an article without any comments", () => {
          return request
            .get("/api/articles/2/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body.length).to.equal(0);
            });
        });
        describe("Invalid requests", () => {
          it("STATUS 404: responds with article not found", () => {
            return request
              .get("/api/articles/999/comments")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Article Not Found");
              });
          });
          it("STATUS 405: responds with msg method not allowed", () => {
            const invalidMethods = ["delete", "put"];
            invalidMethods.map(method => {
              return request[method]("/api/articles/1/comments")
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("Method Not Allowed");
                });
            });
          });
        });
        describe("Queries:", () => {
          describe("sort_by query:", () => {
            describe("comments are sorted by their created_at in  descending order)", () => {
              it("STATUS 200: comments are sorted by votes when passed votes in sort_by query", () => {
                return request
                  .get("/api/articles/1/comments?sort_by=votes")
                  .expect(200)
                  .then(({ body }) => {
                    expect(body).to.be.descendingBy("votes");
                  });
              });
              it("STATUS 200: comments are sorted by votes when passed votes in sort_by query", () => {
                return request
                  .get("/api/articles/1/comments?sort_by=votes")
                  .expect(200)
                  .then(({ body }) => {
                    expect(body).to.be.descendingBy("votes");
                  });
              });
              it("STATUS 200: comments are sorted by comment_id when passed comment_id in sort_by query", () => {
                return request
                  .get("/api/articles/1/comments?sort_by=comment_id")
                  .expect(200)
                  .then(({ body }) => {
                    expect(body).to.be.descendingBy("comment_id");
                  });
              });
            });
          });
          describe("Order query:", () => {
            describe("can be set to asc or desc for ascending or descending (defaults to descending)", () => {
              it("STATUS 200: By default, it responds with array of comments sorted by comment_id query", () => {
                return request
                  .get("/api/articles/1/comments")
                  .expect(200)
                  .then(({ body }) => {
                    expect(body).to.be.descendingBy("created_at");
                  });
              });
              it("STATUS 200: sends an array of comments sorted in ascending order when passed asc in order query", () => {
                return request
                  .get("/api/articles/1/comments?order=acs")
                  .expect(200)
                  .then(({ body }) => {
                    expect(body).to.be.ascendingBy("created_at");
                  });
              });
            });
          });
        });
      });
    });
    describe("GET", () => {
      describe("/", () => {});
    });
    describe("/comments", () => {
      describe("PATCH", () => {
        describe("/:comment_id", () => {
          it("STATUS 201: takes a body object as { inc_votes: newVote } to update votes property ", () => {
            return request
              .patch("/api/comments/1")
              .send({ inc_votes: 2 })
              .expect(201)
              .then(({ body: { updatedComment } }) => {
                expect(updatedComment.votes).to.equal(18);
              });
          });
          it("STATUS 201: sends an object with the updated comment ", () => {
            return request
              .patch("/api/comments/1")
              .send({ inc_votes: 3 })
              .expect(201)
              .then(({ body: { updatedComment } }) => {
                expect(updatedComment).to.have.all.keys(
                  "comment_id",
                  "author",
                  "article_id",
                  "votes",
                  "created_at",
                  "body"
                );
              });
          });
          describe("ERRORS:", () => {
            it("404: responds with Comment not found when the comment", () => {
              return request
                .patch("/api/comments/999")
                .send({ inc_votes: 3 })
                .expect(404)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("Comment Not Found");
                });
            });
            it("400: responds with bad request when the body object is miss formated", () => {
              return request
                .patch("/api/comments/1")
                .send({ inc_votes: "should be a number" })
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("Bad request");
                });
            });
            it("400: responds with bad request body object is missing", () => {
              return request
                .patch("/api/comments/1")
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("Bad request");
                });
            });
            it("400: responds with bad request to invalid comment id", () => {
              return request
                .patch("/api/comments/six")
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("Bad request");
                });
            });
            it("405: responds with Method Not Allowed to invalid requests", () => {
              const invalidMethods = ["put", "delete", "patch"];
              const methodPromises = invalidMethods.map(method => {
                return request[method]("/api/articles/1/comments")
                  .expect(405)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal("Method Not Allowed");
                  });
              });
            });
          });
        });
      });
      describe("/:comment_id", () => {
        describe("DELETE", () => {
          it("STATUS 204: Deletes comment by comment_id ", () => {
            return request.del("/api/comments/1").expect(204);
          });
          describe("ERRORS", () => {
            it("STATUS 404: responds with Comment Not Found invalid comment_id  ", () => {
              return request
                .del("/api/comments/999")
                .expect(404)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("Comment Not Found");
                });
            });
            it("STATUS 400: responds with Bad request error to invalid comment_id", () => {
              return request
                .del("/api/comments/babyShark")
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("Bad request");
                });
            });
          });
        });
      });
    });
  });
});
