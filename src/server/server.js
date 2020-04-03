const dotenv = require("dotenv");
dotenv.config();

/* Express to run server and routes */
const express = require("express");

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static("dist"));
app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

const port = 8085;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
  console.log(`localhost:${port}`);
}

// POST route
app.post("/POST", (req, res) => {
  res.send({ respnse: "data add it successfully" });
});
