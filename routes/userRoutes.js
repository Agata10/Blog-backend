const express = require("express");
const router = express.Router();

const users = require("../data/users");

router.route("/").get((req, res) => {
  res.render("users", { title: "users", users });
});

router.route("/:id/posts/create").get((req, res) => {
  res.send(req.params);
});

module.exports = router;
