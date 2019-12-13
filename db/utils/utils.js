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

exports.formatComments = (comments, articleRef) => {};
