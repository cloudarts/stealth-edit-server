var express = require('express');
var app = express();

app.get('/*', function(req, res){
	var body = 'Hello World';
	res.end(body);
});

app.listen(88);
console.log("server running");
