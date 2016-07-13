(function() {
  var socket = io.connect('http://localhost:5000');
  var head = document.getElementsByTagName('head')[0];
  var body = document.getElementsByTagName('body')[0];
  var links = document.getElementsByTagName('link');
  var scripts = document.getElementsByTagName('script');

  function reloadCSS() {
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (link.type === 'text/css') {
        link.parentNode.removeChild(link);
        head.insertBefore(link, head.firstChild);
      }
    }
  }

  function reloadJS() {
    var newScripts = [];
    for (var i = 0; i < scripts.length; i++) {
      var script = scripts[i]
      newScripts.push(script.src);
      script.parentNode.removeChild(script);
    }
    for (var i = 0; i < newScripts.length; i++) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = newScripts[i]
      body.insertBefore(script, body.lastChild);
    }
  }

  socket.on('htmlChange', function(data) {
    window.location.reload();
  });

  socket.on('cssChange', function(data) {
    reloadCSS();
  });

  socket.on('jsChange', function(data) {
    reloadJS();
  });

})();
