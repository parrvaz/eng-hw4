var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));

const axios = require("axios");

const port = process.env.PORT || 8080;

// Set EJS as templating engine
app.set("view engine", "ejs");

// index page
app.get("/", (req, res) => {
  axios
    .get("http://covid19api.xapix.io/v2/locations")
    .then(function (response, data) {
      data = response.data;

      var result = [];
      for (var i = 0; i < data.locations.length; i++) {
        result.push({
          name: data.locations[i].country,
          population: data.locations[i].country_population,
          confirmedCases: data.locations[i].latest.confirmed,
          deaths: data.locations[i].latest.deaths,
          recovered: data.locations[i].latest.recovered,
        });
      }
      res.render("pages/index", { table: result });
    });
});

app.listen(port, () => console.log(`covid app ${port}`));
