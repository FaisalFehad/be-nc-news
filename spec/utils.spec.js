const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
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

describe("makeRefObj", () => {
  it("returns an empty object when passed an empty array", () => {
    expect(makeRefObj([])).to.deep.equal({});
  });

  it("creates a reference object when passed an array of objects", () => {
    const data = [{ article_id: 1, title: "A" }];
    const expected = { A: 1 };
    expect(makeRefObj(data)).to.deep.equal({ A: 1 });
  });

  it("does not mutate the original array", () => {
    const data = [{ article_id: 1, title: "A" }];
    const copyData = [{ article_id: 1, title: "A" }];
    const expected = { A: 1 };
    makeRefObj(data);
    expect(data).to.equal(data);
  });
});

describe.only("formatComments", () => {
  it("returns a new array when invoked with no arguments", () => {
    expect(formatComments()).to.deep.equal([]);
  });

  describe("takes a comments and reference object, and returns newly formated comments", () => {
    const testComments = [
      {
        title: "Stone Soup",
        topic: "cooking",
        author: "cooljmessy",
        body: "The first day I pu...",
        created_at: 1481662720516
      },
      {
        title: "The vegan carnivore?",
        topic: "cooking",
        author: "tickle122",
        body: "The chef Richst...",
        created_at: 1492163783248
      }
    ];
    const testRef = makeRefObj(testComments);

    it("returns a renamed created_by property into author", () => {
      const testArticles = [
        {
          article_id: 1,
          title: "Agility Training....",
          topic: "cooking",
          author: "cooljmessy",
          body: "The first day I pu...",
          created_at: 1481662720516
        },
        {
          article_id: 2,
          title: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
          topic: "cooking",
          author: "tickle122",
          body: "The chef Richst...",
          created_at: 1492163783248
        }
      ];

      const testComments = [
        {
          body: "Praesentium pariatur a nisi aut.",
          belongs_to: "Agility Training....",
          created_by: "grumpy19",
          votes: 11,
          created_at: 1462414995595
        },
        {
          body: "Voluptatum aut fac",
          belongs_to: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
          created_by: "weegembump",
          votes: -4,
          created_at: 1477955052607
        }
      ];

      const testRef = makeRefObj(testArticles);
      const actual = formatComments(testComments, testRef);
      expect(actual[0]).to.not.have.keys("created_by");
      expect(actual[0]).to.contain.keys("author");
    });

    it("returns a renamed belongs_to property to article_id", () => {
      const testArticles = [
        {
          article_id: 1,
          title: "Agility Training....",
          topic: "cooking",
          author: "cooljmessy",
          body: "The first day I pu...",
          created_at: 1481662720516
        },
        {
          article_id: 2,
          title: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
          topic: "cooking",
          author: "tickle122",
          body: "The chef Richst...",
          created_at: 1492163783248
        }
      ];

      const testComments = [
        {
          body: "Praesentium pariatur a nisi aut.",
          belongs_to: "Agility Training....",
          created_by: "grumpy19",
          votes: 11,
          created_at: 1462414995595
        },
        {
          body: "Voluptatum aut fac",
          belongs_to: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
          created_by: "weegembump",
          votes: -4,
          created_at: 1477955052607
        }
      ];

      const testRef = makeRefObj(testArticles);
      const actual = formatComments(testComments, testRef);
      expect(actual[0]).to.not.have.keys("belongs_to");
      expect(actual[0]).to.contain.keys("article_id");
    });

    it("The value of the new article_id key must be the id corresponding to the original title value provided", () => {
      const testArticles = [
        {
          article_id: 1,
          title: "Agility Training....",
          topic: "cooking",
          author: "cooljmessy",
          body: "The first day I pu...",
          created_at: 1481662720516
        },
        {
          article_id: 2,
          title: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
          topic: "cooking",
          author: "tickle122",
          body: "The chef Richst...",
          created_at: 1492163783248
        }
      ];

      const testComments = [
        {
          body: "Praesentium pariatur a nisi aut.",
          belongs_to: "Agility Training....",
          created_by: "grumpy19",
          votes: 11,
          created_at: 1462414995595
        },
        {
          body: "Voluptatum aut fac",
          belongs_to: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
          created_by: "weegembump",
          votes: -4,
          created_at: 1477955052607
        }
      ];

      const testRef = makeRefObj(testArticles);
      const actual = formatComments(testComments, testRef);

      expect(actual[0].article_id).to.equal(1);
      expect(actual[1].article_id).to.equal(2);
    });

    it("Its created_at value converted into a javascript date object", () => {
      const testArticles = [
        {
          article_id: 1,
          title: "Agility Training....",
          topic: "cooking",
          author: "cooljmessy",
          body: "The first day I pu...",
          created_at: 1481662720516
        },
        {
          article_id: 2,
          title: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
          topic: "cooking",
          author: "tickle122",
          body: "The chef Richst...",
          created_at: 1492163783248
        }
      ];

      const testComments = [
        {
          body: "Praesentium pariatur a nisi aut.",
          belongs_to: "Agility Training....",
          created_by: "grumpy19",
          votes: 11,
          created_at: 1462414995595
        },
        {
          body: "Voluptatum aut fac",
          belongs_to: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
          created_by: "weegembump",
          votes: -4,
          created_at: 1477955052607
        }
      ];

      const testRef = makeRefObj(testArticles);
      const actual = formatComments(testComments, testRef);
      expect(actual[0].created_at).to.be.an.instanceOf(Date);
    });

    it("Its maintains the rest of the comment properties", () => {
      const testArticles = [
        {
          article_id: 1,
          title: "Agility Training....",
          topic: "cooking",
          author: "cooljmessy",
          body: "The first day I pu...",
          created_at: 1481662720516
        },
        {
          article_id: 2,
          title: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
          topic: "cooking",
          author: "tickle122",
          body: "The chef Richst...",
          created_at: 1492163783248
        }
      ];

      const testComments = [
        {
          body: "Praesentium pariatur a nisi aut.",
          belongs_to: "Agility Training....",
          created_by: "grumpy19",
          votes: 11,
          created_at: 1462414995595
        },
        {
          body: "Voluptatum aut fac",
          belongs_to: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
          created_by: "weegembump",
          votes: -4,
          created_at: 1477955052607
        }
      ];

      const testRef = makeRefObj(testArticles);
      const actual = formatComments(testComments, testRef);
      expect(actual[0]).to.have.all.keys(
        "body",
        "article_id",
        "votes",
        "created_at",
        "author"
      );
    });
  });
});
