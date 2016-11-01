let express = require('express');
let parser = require('body-parser');
let app = express();
// var proxy = require('http-proxy-middleware');
//
// app.use('/api/*', proxy({target: '127.0.0.1:8000', changeOrigin: true}));

var proxy = require('express-http-proxy');

// New hostname+path as specified by question:
var apiProxy = proxy('127.0.0.1:8000', {
  forwardPath: function (req, res) {
    return require('url').parse(req.baseUrl).path;
  }
});

app.use('/api/*', apiProxy);

app.use('/', express.static('public'));

app.listen(process.env.PORT || 3000, () => {
  console.log(`App started on port ${process.env.PORT || 3000}`);
});







