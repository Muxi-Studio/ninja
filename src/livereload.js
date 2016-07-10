(function() {
  var socket = io.connect('http://localhost:5000');
  var head = document.getElementsByTagName('head')[0];
	var links = document.getElementsByTagName('link');

	function reloadCSS() {
    for (var i=0;i<links.length;i++) {
    	var link = links[i];
    	link.parentNode.removeChild(link);
    	head.insertBefore(link, head.firstChild);
    }
  }

  socket.on('htmlChange', function(data) {
    window.location.reload();
  });

  socket.on('cssChange', function(data) {
    reloadCSS();
  });

})();
