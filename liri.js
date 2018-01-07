'use strict';

var dotenv = require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
// console.log(spotify);
var client = new Twitter(keys.twitter);
// console.log(client);

var command = process.argv[2];


switch(command) {

  case "my-tweets":
    client.get('statuses/user_timeline', {screen_name: 'setrob03', count: 20}, function(error, tweets, response) {
      if (error) {
        console.log(error);
      }
      for (var i = 0; i < tweets.length; i++) {
        tweets.reverse();
        console.log((i + 1) + '.')
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
        return console.log('Error occurred: ' + err);
      }
      data.tracks.items.forEach(function(index, value) {
        console.log("Artist(s): ");
        console.log(data.tracks.items[value].album.artists[0].name + '\n');
        console.log("Song Name: ");
        console.log(data.tracks.items[value].name + '\n');
        console.log("Song Preview Link: ");
        console.log(data.tracks.items[value].preview_url + '\n');
        console.log("Album Name: ");
        console.log(data.tracks.items[value].album.name);
        console.log("__________________________________________________________________");
      });
    });
    break;
  case "movie-this":
  var movieName = '';
  for (var i = 2; i < process.argv.length; i++) {
    movieName += process.argv[i];
  }
  // Then run a request to the OMDB API with the movie specified
  request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {


      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("The movie's release date is: " + JSON.parse(body).Released);
      // console.log(body);
    }
  });
  break;

  case "do-what-it-says":
  break;
}
