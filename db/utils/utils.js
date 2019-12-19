exports.formatDates = list => {
  const result = [];

  list.forEach(item => {
    let objCopy = { ...item };
    objCopy.created_at = new Date(objCopy.created_at);
    result.push(objCopy);
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

    newComment.author = newComment.created_by;
    delete newComment.created_by;

    newComment.article_id = articleRef[newComment.belongs_to];
    delete newComment.belongs_to;

    newComment.created_at = new Date(newComment.created_at);
    commentsArr.push(newComment);
  });
  return commentsArr;
};
