const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const users = require("../data/users");

router
  .route("/")
  .get((req, res) => {
    res.json(posts);
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const userExists = users.find((u) => u.id == req.body.userId);
      if (userExists) {
        const post = {
          id: posts[posts.length - 1].id + 1,
          userId: Number(req.body.userId),
          title: req.body.title,
          content: req.body.content,
        };

        posts.push(post);
        res.json(posts[posts.length - 1]);
        // console.log(req.body);
        console.log("Successfully created post");
        return;
      }
    } else {
      return res.json({ error: "Invalid data" });
    }
  });

router.route(":id").get().patch().delete();

module.exports = router;
