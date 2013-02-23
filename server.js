var express = require('express');
var app = express();
var fs = require('fs');
var util = require('util');

app.use(require('connect').bodyParser());

/*
app.get('/*', function(req, res){
	var body = 'Hello World';
	res.end(body);
});
*/

app.post('/saveLevel', function(req, res){
  	var levelObject = req.body;
	console.log(util.inspect(levelObject));
	fs.writeFile(levelObject.levelID, JSON.stringify(levelObject), function(err) {
    		if(err) {
        		console.log(err);
			res.send("error");
    		} else {
        		console.log("" + levelObject.levelID + " saved!");
			res.send("ok");
    		}
	}); 
});

app.get('/loadLevel/:levelID', function(req, res) {
	var levelID = req.params.levelID;
	fs.readFile(levelID, 'utf8', function(err, data) {
		if( err ) {
			console.log(err);
			res.send("error");
		}
		else {
			console.log("loaded: " + util.inspect(data));
			
			res.send(data);
		}
	});
});

app.listen(88);
console.log("server running");
