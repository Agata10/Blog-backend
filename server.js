const express = require("express");
const app = express();
const PORT = 3000;

//set up template engine
app.set("view engine", "ejs");

//use body-parser to access send body in the request
app.use(express.json());

//Logging requests middleware
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `\n At ${time.toLocaleTimeString()}: ${req.method} request recieved to ${
      req.url
    }`
  );
  if (Object.keys(req.body).length > 0) {
    console.log(`Containg the data: `);
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

//homepage
//render view with main links for /api routes
app.get("/", (req, res) => {
  const menuLinks = [
    { tagName: "Users", href: "/api/users" },
    { tagName: "All Posts", href: "/api/posts" },
  ];
  res.render("home", { title: "Welcome to the world of magic", menuLinks });
});

//middleware to handling if route not found 404
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = "404";
  next(err);
});

//error handling middleware
//render view for error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.message;
  const title = "error";
  res.status(status);
  res.render("error", { status, msg, title });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}.`);
});
