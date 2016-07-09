var fs = require('fs')

module.exports = function(templateDir, staticDir, webpackFlag) {

  // start the socket server
  var app = require('express')();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);

  server.listen(5000);

  app.get('/livereload.js', function(req, res) {
    res.sendFile(__dirname + '/livereload.js');
  })

  app.get('/client.js', function(req, res) {
    res.sendFile(__dirname + '/lib/socket.client.js');
  })

  io.on('connection', function(socket) {

  });

  // watch file changes
  fs.watch(process.cwd() + templateDir, {
    encoding: 'utf8',
    recursive: true
  }, (event, filename) => {
    if (/html/.test(filename)) {
      io.emit('htmlChange', {});
    } 
  });

  if (!webpackFlag && staticDir) {
    fs.watch(process.cwd() + staticDir, {
      encoding: 'utf8',
      recursive: true
    }, (event, filename) => {
      console.log('css change')
      if (/css/.test(filename)) {
        io.emit('cssChange', {});
      }
    });
  }

}
