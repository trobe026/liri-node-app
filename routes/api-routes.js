var db = require("../models");
var dotenv = require("dotenv").config();
var request = require('request');


module.exports = function(app) {
  app.get("/api/:movie?", function(req, res) {
    var movie = req.query.movieName;
    var relYear =req.query.relYear;
    if (movie === '') {
      request.get({
        url: 'http://www.omdbapi.com/?t=' + relYear + '&y=&plot=short&apikey=' + process.env.API_KEY
      },(err, resp, body) => {
        res.json(body);
      })
    } else {
      request.get({
        url: 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=' + process.env.API_KEY
      },(err, resp, body) => {
        res.json(body);
      })
    }
  });
};
