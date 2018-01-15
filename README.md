# Liri App

### A command line node app which takes in parameters and returns data from either Twitter, Spotify, or OMDB.

#### The app takes in 5 possible parameters, *"my-tweets"*, *"spotify-this-song"*, *"movie-this"*, *"do-what-it-says"*, or *"erase-log"*.
#### Run the app by entering "node-liri" followed by one of the above parameters on the command line.
#### The app uses account specific Twitter and Spotify API keys which must be stored in a .env file, and are being accessed by the keys.js file via the dotenv module.  To run this app, you must supply your own API keys in a .env file. The .env file should appear as so:
###### SPOTIFY_ID=your-spotify-id
###### SPOTIFY_SECRET=your-spotify-secret
###### TWITTER_CONSUMER_KEY=your-twitter-consumer-key
###### TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
###### TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
###### TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

#### Once the .env file is in the same directory as liri.js and contains the necessary API keys, the commands below can be entered.  
#### All results of the search commands are saved in a separate log.txt file.

## Commands:

* **node liri my-tweets**

  * Returns the tweets, up to 20, of the twitter account which belongs to the specified API key.

* **node liri spotify-this-song (song name)**

  * Returns information for first 5 Spotify results for song entered.

* **node liri movie-this (movie name)**

  * Returns information for movie entered from OMDB.

* **node liri do-what-it-says**

  * This command will take in parameters specified in the random.txt file. These parameters can be changed to any of the available 5.

* **node liri erase-log**

  * Displays a confirmation message to erase "log.txt" file.  If yes, clears file and displays a message in console if successful.

#### Additionally, "node http.js" can be ran to start a node server on port 8080. Start the server and navigate to http://localhost:8080 to view current state of log.txt.  Currently any changes to log.txt can only be viewed by refreshing the page.
