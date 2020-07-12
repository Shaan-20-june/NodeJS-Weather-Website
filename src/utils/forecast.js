const request = require("request");

const forecast = (latitude, longitude, callback) => {
  url =
    "http://api.weatherstack.com/current?access_key=d80ded98a3608a506046ded2ea3630c7&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connnect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to detect the location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It's " +
          body.current.temperature +
          " degree celcius now. It feels like " +
          body.current.temperature +
          " degree celcius"
      );
    }
  });
};

module.exports = forecast;
