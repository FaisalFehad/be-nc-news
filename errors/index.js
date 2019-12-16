exports.handleCustoms = (err, req, res, next) => {
  if (err) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handle404 = (req, res, next) => {
  res.status(404).send({ msg: "Not found" });
};

exports.handle402 = (req, res, next) => {
  res.status(402).send({ msg: "No Content" });
};
