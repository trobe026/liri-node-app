var http = require('http');
var fs = require("fs");

// http.createServer(function (request, response) {
//   response.writeHead(200);
//   fs.readFile('log.txt','utf8', function(err, data) {
//     if (err) {
//       return console.log(err);
//     }
//     var dataArr = data.split(',');
//     for (data of dataArr) {
//       console.log(data);
//       response.write(data);
//     }
//     response.end();
//     });
// }).listen(8080);
// console.log('Listening on port 8080');

http.createServer(function (request, response) {
  response.writeHead(200);
  fs.readFile('log.txt','utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var dataArr = data.split(',');
    for (data of dataArr) {
      // console.log(data);
      response.write(data);
    }
    response.end();
    });
  fs.watch('log.txt','utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var dataArr = data.split(',');
    for (data of dataArr) {
      // console.log(data);
      response.write(dataArr);
    }
    response.end();
    });
}).listen(8080);
console.log('Listening on port 8080');
