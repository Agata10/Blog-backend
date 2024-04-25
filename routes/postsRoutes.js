const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const users = require("../data/users");

router
  .route("/")
  .get((req, res) => {
    res.render("posts", { title: "posts", posts });
    //res.json(posts);
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

router
  .route("/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) {
      res.json(post);
    } else {
      next();
    }
  })
  .put((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) {
      if (req.body.userId && req.body.title && req.body.content) {
        for (let key in req.body) {
          post[key] = req.body[key];
        }
        res.json(post);
      } else {
        return res.json({
          error: "Properties required: userId, title, content",
        });
      }
    } else {
      next();
    }
  })
  .delete((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });
    if (post) {
      res.json(post);
    } else {
      return res.json({ error: "Post not found" });
    }
  });

module.exports = router;
