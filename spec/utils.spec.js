const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe.only("formatDates", () => {
  it("returns an empty array when passed an empty array ", () => {
    expect(formatDates([])).to.be.an("array");
  });

  it("returns an array with an object that contains title, topic, author, body and created_at properties, when passed an array of objects", () => {
    const arrOfObj = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part two of a series....",
        created_at: 1471522072389
      }
    ];

    const actual = formatDates(arrOfObj);
    expect(actual[0]).to.have.all.keys(
      "title",
      "topic",
      "author",
      "body",
      "created_at"
    );
  });

  it("changes the created_at property of each object to js data object", () => {
    const arrOfObj = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part two...",
        created_at: 1471522072389
      },
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part two of...",
        created_at: 1471522072389
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body: "Many people know...",
        created_at: 1500584273256
      }
    ];

    const actual = formatDates(arrOfObj);
    expect(actual[0].created_at).to.be.an.instanceOf(Date);
    expect(actual[1].created_at).to.be.an.instanceOf(Date);
    expect(actual[2].created_at).to.be.an.instanceOf(Date);
  });

  it("dose not mutate the original array", () => {
    const originalArr = [
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body: "Many people know...",
        created_at: 1500584273256
      }
    ];

    const originalArr2 = [
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body: "Many people know...",
        created_at: 1500584273256
      }
    ];
    const actual = formatDates(originalArr);
    expect(actual).to.not.equal(originalArr);
    expect(originalArr).to.deep.equal(originalArr2);
  });

  it("dose not mutate the objects", () => {
    const arrOfObj = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part two of a series....",
        created_at: 1471522072389
      }
    ];

    const arrOfObj2 = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part two of a series....",
        created_at: 1471522072389
      }
    ];

    const actual = formatDates(arrOfObj);
    expect(arrOfObj[0]).to.deep.equal(arrOfObj2[0]);
  });
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});
