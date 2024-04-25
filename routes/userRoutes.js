const express = require("express");
const router = express.Router();

const users = require("../data/users");
const posts = require("../data/posts");

router
  .route("/")
  .get((req, res) => {
    res.render("users", { title: "users", users });
  })
  .post((req, res) => {
    if (req.body.name && req.body.username && req.body.email) {
      const foundUser = users.find((u) => u.username == req.body.username);
      if (foundUser) {
        res.json({ error: "Username Already Taken" });
        return;
      }
      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };
      users.push(user);
      res.json(users[users.length - 1]);
    } else res.json({ error: "Invalid Data, need: name, username, email" });
  });

//Retrieves all posts by a user with the specified id
//it might have query to sort by id either desc or asc
router.route("/:id/posts/").get((req, res, next) => {
  const userPosts = posts.filter((p) => p.userId == req.params.id);
  const userName = users.find((u) => u.id == req.params.id).name;
  if (req.query.sortBy === "id:desc") {
    userPosts.sort((a, b) => {
      return b.id - a.id;
    });
  } else if (req.query.sortBy === "id:asc") {
    userPosts.sort((a, b) => {
      return a.id - b.id;
    });
  }
  if (userPosts) {
    return res.render("users", { title: "posts", users, userPosts, userName });
  } else {
    next();
  }
});

//render creating post view
router.route("/:id/posts/create").get((req, res, next) => {
  res.render("createPost", { userId: req.params.id, title: "create post" });
});

//GET, PATCH, DELETE the user with specific id parameter
router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);
    if (user) {
      res.json(user);
    } else {
      next();
    }
  })
  .patch((req, res) => {
    const user = users.find((p) => p.id == req.params.id);
    if (user) {
      for (let key in req.body) {
        user[key] = req.body[key];
      }
      res.json(user);
    } else {
      return res.json({ error: "User not found" });
    }
  })
  .delete((req, res) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });
    if (user) {
      res.json(user);
    } else {
      return res.json({ error: "User not found" });
    }
  });

module.exports = router;
