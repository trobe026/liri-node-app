'use strict';

// requiring necessary modules
var dotenv = require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');
var fs = require("fs");
var log = require('simple-node-logger').createSimpleLogger('log.txt');
var util = require('util');
var inquirer = require("inquirer");

// change console.log to write to log.txt file and process.stdout
var log_file = fs.createWriteStream(__dirname + '/log.txt', {flags : 'a+'});
var log_stdout = process.stdout;
console.log = function(d) {
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

function runCommand() {
  switch(command) {
    case "my-tweets":
      client.get('statuses/user_timeline', {screen_name: 'setrob03', count: 20}, function(error, tweets, response) {
        if (error) {
          console.log(error);
        }
        for (var i = 0; i < tweets.length; i++) {
          tweets.reverse();
          console.log((i + 1) + '.');
          console.log(tweets[i].created_at);
          console.log(tweets[i].text + '\n');
        }
      });
      break;

    case "spotify-this-song":
    var songName = '';
    for (var i = 3; i < process.argv.length; i++) {
      songName += process.argv[i] + " ";
    }
    if (songName === '') {
      songName = "The Sign, Ace of Base";
    }
      spotify.search({ type: 'track', query: songName, limit: 5 }, function(err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
          return;
        }
        data.tracks.items.forEach(function(index, value) {
            console.log("Artist(s): ");
            console.log(data.tracks.items[value].album.artists[0].name + '\n');
            console.log("Song Name: ");
            console.log(data.tracks.items[value].name + '\n');
            console.log("Song Preview Link: ");
            if (data.tracks.items[value].preview_url === null) {
              console.log("Not Available for this song.\n");
            } else {
              console.log(data.tracks.items[value].preview_url + '\n');
            }
            console.log("Album Name: ");
            console.log(data.tracks.items[value].album.name);
            console.log("__________________________________________________________________");
        });
      });
      break;

    case "movie-this":
    var movieName = '';
    for (var i = 3; i < process.argv.length; i++) {
      movieName += process.argv[i] + " ";
    }
    if (movieName === '') {
      movieName = "Mr. Nobody";
    }
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
      if (!error && response.statusCode === 200) {
        if (JSON.parse(body).Title === undefined) {
          return console.log("\nInvalid movie selection, or movie does not exist in database, please try again.\n");
        }
        console.log('\n' + "Movie Title: " + JSON.parse(body).Title + '\n');
        console.log("Release date: " + JSON.parse(body).Released + '\n');
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value + '\n');
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + '\n');
        console.log("Produced In: " + JSON.parse(body).Country + '\n');
        console.log("Language: " + JSON.parse(body).Language + '\n');
        console.log("Plot: " + JSON.parse(body).Plot + '\n');
        console.log("Cast: " + JSON.parse(body).Actors + '\n\n');

        if (movieName === "Mr. Nobody") {
          console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/");
          console.log("It's on Netflix!");
        }
      }
    });
    break;
  }
}
// separate 4th liri option
  if (process.argv[2] === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      }
      var output = data.split(",");
      process.argv[2] = output[0];
      process.argv[3] = output[1];
      command = process.argv[2];
      runCommand();
    });
  }
  if (process.argv[2] === 'erase-log') {
    function eraseLog() {
      inquirer.prompt([
        {
          name: "confirm",
          type: "confirm",
          message: "This will clear entire contents of log.txt - Are you sure?"
        }
      ]).then(function(answer) {
        if (answer.confirm === true) {
          fs.writeFile(
          "log.txt",
          "",
          {
              encoding: "utf-8",
              flag: "w"
          },
          function() {
            log_stdout.write(util.format("Log has been cleared") + '\n');
          })
        }
      });
    }
    eraseLog();
  }

runCommand();
