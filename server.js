const exp = require("constants");
const express = require("express");
const { stat } = require("fs");
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
app.get("/", (req, res) => {
  res.render("home", { title: "Welcome to the world of magic" });
});

app.get("/example", (req, res, next) => {
  const err = new Error("Example error");
  err.status = 400; // Set status code to 400 (Bad Request)
  next(err);
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
