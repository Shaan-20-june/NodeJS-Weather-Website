const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// Defines Path for Express Config
const pathDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(pathDirectory));

// Index
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "SANTANU DUTTA",
  });
});

// About
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About section",
    name: "SANTANU DUTTA",
  });
});

// Help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help section",
    name: "SANTANU DUTTA",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address ",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location: place,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("view", {
    title: 404,
    name: "Santanu Dutta",
    errorMsg: "HELP ARTICLE IS NOT AVAILABLE.",
  });
});

app.get("*", (req, res) => {
  res.render("view", {
    title: 404,
    name: "Santanu Dutta",
    errorMsg: "404 ERROR! PAGE NOT FOUND.",
  });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
