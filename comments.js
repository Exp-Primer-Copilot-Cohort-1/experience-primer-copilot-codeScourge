// create a webserver
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

// create a server
var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// serve index.html
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

// serve comments.json
app.get('/comments.json', function(req, res) {
	console.log('GET comments.json');
	fs.readFile('comments.json', function(err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		res.setHeader('Content-Type', 'application/json');
		res.send(data);
	});
});