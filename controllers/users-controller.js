const { fetchUserByUsername } = require("../models/users-model");

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(user => {
      if (user) res.status(200).send({ user });
      else res.status(204).send({ msg: "The user is not found" });
    })
    .catch(next);
};
