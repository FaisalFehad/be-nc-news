exports.formatDates = list => {
  const result = [];

  list.forEach(item => {
    let ObjCopy = { ...item };
    ObjCopy.created_at = new Date(ObjCopy.created_at);
    result.push(ObjCopy);
  });
  return result;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
