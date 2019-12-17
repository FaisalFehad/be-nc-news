exports.teapot = (req, res, next) => {
  res.sendStatus(418).catch(next);
};
