exports.handleCustoms = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handle400 = (err, req, res, next) => {
  const codes = ["22P02"];
  if (codes.includes(err.code)) res.status(400).send({ msg: "Bad request" });
  else next(err);
};

exports.handle404 = (req, res, next) => {
  res.status(404).send({ msg: "Not found" });
};

exports.handle402 = (req, res, next) => {
  res.status(402).send({ msg: "No Content" });
};
