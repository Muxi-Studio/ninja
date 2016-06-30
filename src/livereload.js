var socket = io.connect('http://localhost:5000');
socket.on('fileChange', function(data) {
  window.location.reload();
});
