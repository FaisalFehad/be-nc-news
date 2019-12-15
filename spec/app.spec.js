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
          it("STATUS 402: sends an object with The user is not found message when requested a use that dose not exist", () => {
            return request.get("/api/users/not-user-name").expect(204);
            // .then(({ body: { msg } }) => {
            //   expect(msg).to.equal("The user is not found");
            // });
          });
        });
      });
    });
    describe("/articles", () => {
      describe("GET", () => {
        describe("/article_id", () => {
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
        });
        describe("/article_id", () => {
          it("STATUS 404: sends 404 when requested an article that dose not exist", () => {
            return request
              .get("/api/articles/0")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("The article is not found");
              });
          });
        });
      });
      describe("PATCH", () => {
        describe("/article_id", () => {});
      });
    });
    describe("POST", () => {
      describe(":article_id/comments", () => {});
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
      describe("/:comment_id", () => {});
    });
  });
});
