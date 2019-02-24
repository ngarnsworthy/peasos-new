var http = require('http');
var fs = require('fs');
var path = require('path');


http.createServer(function(req, res) {

  console.log('request received');

  var filePath = '.' + req.url;
  if (filePath == './')
    filePath = './index.html';

  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
  }

  console.log(filePath);

  if (req.method == "POST") {
    var body = "";

    req.on("data", function(data) {
      body += data;
    });
    req.on('end', function() {
      console.log(body);
      password = body.split('=')[1];
      console.log(password);
      console.log("END");
    });
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end('post received');
  } else {

    switch (filePath) {


      default:

        fs.readFile(filePath, function(error, content) {
          if (error) {
            if (error.code == 'ENOENT') {
              fs.readFile('./404.html', function(error, content) {
                res.writeHead(200, {
                  'Content-Type': contentType
                });
                res.end(content, 'utf-8');
              });
            } else {
              res.writeHead(500);
              res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
              res.end();
            }
          } else {
            res.writeHead(200, {
              'Content-Type': contentType
            });
            res.end(content, 'utf-8');
          }
        });
    }
  }
}).listen(8125);
