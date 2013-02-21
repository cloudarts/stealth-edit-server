var express = require('express');
var app = express();

app.use(express.bodyParser());

app.get('/*', function(req, res){
	var body = 'Hello World';
	res.end(body);
});

app.post('/saveLevel', function(req, res){
  console.log(req.body);
  res.send("ok");
});

app.listen(88);
console.log("server running");
