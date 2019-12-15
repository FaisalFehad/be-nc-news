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
      describe("GET", () => {});
    });
    describe("/articles", () => {
      describe("GET", () => {
        describe("/article_id", () => {});
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
