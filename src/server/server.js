const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");

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
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// const port = 8085;
/* Spin up the server*/
// const server = app.listen(port, listening);

function listening() {
  console.log(`localhost:${port}`);
}
// get root
app.get("/testServer", async (req, res) => {
  res.json({ message: "pass!" });
});

// POST route
app.post("/POST", (req, res) => {
  let temperature;
  let image;
  let summary;
  // GeoameApi
  const geoNameApi = `http://api.geonames.org/searchJSON?q=${req.body.destination}&maxRows=10&username=${process.env.geoName_username}`;

  axios
    .get(geoNameApi)
    .then((response) => {
      // res.send(response.data);
      if (response.data.totalResultsCount == 0) {
        // res.send({ error: "destination" });
        throw new Error("destination");
      }
      const lat = response.data.geonames[0].lat;
      const lng = response.data.geonames[0].lng;
      const countryName = response.data.geonames[0].countryName;

      // DarkskiApi
      const darkskyApi = `https://api.darksky.net/forecast/${process.env.darkSkyApi}/${lat},${lng},${req.body.date}`;

      axios.get(darkskyApi).then((response) => {
        temperature = response.data.currently.temperature;
        summary = response.data.currently.summary;
        // PixabayApi
        const pixabayApi = `https://pixabay.com/api/?key=${process.env.pixabayApi_key}&q=${req.body.destination}&image_type=photo`;

        axios.get(pixabayApi).then((response) => {
          // test if didn't find an image for my search
          if (response.data.hits.length === 0) {
            // send a new request with countryName
            const pixabayApi = `https://pixabay.com/api/?key=${process.env.pixabayApi_key}&q=${countryName}&image_type=photo`;

            axios.get(pixabayApi).then((response) => {
              image = response.data.hits[0].webformatURL;
              res.send({ temperature: temperature, image: image });
            });
          }
          image = response.data.hits[0].webformatURL;
          res.send({
            temperature: temperature,
            image: image,
            summary: summary,
          });
        });
      });
    })
    .catch((err) => {
      res.send({ error: err.message });
    });
});

module.exports = app;
