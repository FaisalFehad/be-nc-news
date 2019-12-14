exports.formatDates = list => {
  const result = [];

  list.forEach(item => {
    let ObjCopy = { ...item };
    ObjCopy.created_at = new Date(ObjCopy.created_at);
    result.push(ObjCopy);
  });
  return result;
};

exports.makeRefObj = list => {
  if (list.length === 0) return {};
  const newRef = {};
  list.forEach(item => {
    newRef[item.title] = item.article_id;
  });
  return newRef;
};

exports.formatComments = (comments, articleRef) => {
  const commentsArr = [];
  if (!comments) return commentsArr;

  comments.forEach(comment => {
    let newComment = { ...comment };

    // changes created_by to author id
    newComment.author = newComment.created_by;
    delete newComment.created_by;

    // changes belongs_to to article_id
    newComment.article_id = articleRef[newComment.belongs_to];
    delete newComment.belongs_to;

    // The value of the new article_id key must be the id corresponding to the original title value provided

    // Its created_at value converted into a javascript date object
    newComment.created_at = new Date(newComment.created_at);

    commentsArr.push(newComment);
  });
  return commentsArr;
};
