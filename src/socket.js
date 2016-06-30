var fs = require('fs')

module.exports = function() {

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
    console.log('connected!')
  });

  // watch file changes
  fs.watch(process.cwd() + '/template', {
    encoding: 'utf8'
  }, (event, filename) => {
    io.emit('fileChange', {});
  });
}
