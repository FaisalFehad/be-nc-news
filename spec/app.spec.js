process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const connection = require("../db/connection");

beforeEach(() => {
  return connection.seed.run();
});

after(() => {
  connection.destroy();
});
