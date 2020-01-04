exports.handleCustoms = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handle400 = (err, req, res, next) => {
  const codes = ["22P02", "42703"];
  if (codes.includes(err.code)) res.status(400).send({ msg: "Bad request" });
  else next(err);
};

exports.handle422 = (err, req, res, next) => {
  if (err.code === "23503")
    res.status(422).send({ msg: "Unprocessable Entity" });
  else next(err);
};

exports.handle500 = (err, req, res, next) => {
  console.log(err); // do delete before deployment
  res.status(500).send({ msg: "Server Error" });
};

exports.handle405 = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle404 = (req, res, next) => {
  res.status(404).send({ msg: "Not found" });
};
