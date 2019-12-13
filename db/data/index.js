const ENV = process.env.NODE_ENV || "development";

const testData = require("./test-data");
const devData = require("./development-data");

// console.log(devData);
// console.log(devData);

const data = {
  development: devData,
  test: testData
};

module.exports = data[ENV];
