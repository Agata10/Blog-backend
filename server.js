const exp = require("constants");
const express = require("express");
const app = express();
const PORT = 3000;

//set up template engine
app.set("view engine", "ejs");

//use body-parser to access send body in the request
app.use(express.json());

//Logging middleware
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

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}.`);
});
