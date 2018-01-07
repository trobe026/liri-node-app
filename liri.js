require("dotenv").config();

var spotify = new Spotify(keys.spotify);
console.log(spotify);
var client = new Twitter(keys.twitter);
console.log(client);

var command = process.argv[2];
var songName = process.argv[3];

switch(command) {

  case "my-tweets":
    console.log('test');
  case "spotify-this-song":

  case "movie-this":

  case "do-what-it-says":

}
