var express = require('express');
var app = express();
var fs = require('fs');
var util = require('util');

app.use(require('connect').bodyParser());


app.post('/saveLevel', function(req, res){
  	var levelObject = req.body;
	console.log("**************\nattempting to save: \n" + util.inspect(levelObject) + "\n\n");

	// backup old file
	if( fs.existsSync(levelObject.levelID ) ) {
		fs.renameSync(levelObject.levelID, levelObject.levelID + "_" + new Date().getTime());
	}

	// write new level object file
	fs.writeFile(levelObject.levelID, JSON.stringify(levelObject), function(err) {
    		if(err) {
        		console.log(err + "\n\n");
			res.send("error");
    		} else {
        		console.log("" + levelObject.levelID + " saved!\n\n");
			res.send("ok");
    		}
	}); 
});

app.get('/loadLevel/:levelID', function(req, res) {
	var levelID = req.params.levelID;
	console.log("**************\nattempting to load:\n" + levelID);

	fs.readFile(levelID, 'utf8', function(err, data) {
		if( err ) {
			console.log(err + "\n\n");
			res.send("error");
		}
		else {
			console.log("loaded: " + util.inspect(data) + "\n\n");
			
			res.send(data);
		}
	});
});

app.get('/loadLevel', function(req, res) {
	console.log("************\nattempting to load all levels");
	var levels = [];
	levels.push( JSON.parse( fs.readFileSync("E1M1") ) );
	levels.push( JSON.parse( fs.readFileSync("E1M2") ) );
	levels.push( JSON.parse( fs.readFileSync("E1M3") ) );
	levels.push( JSON.parse( fs.readFileSync("E1M4") ) );
	res.send(levels);
});
/*
app.get('/*', function(req, res){
	var body = 'Hello World';
	res.end(body);
});
*});	
/*
app.get('/*', function(req, res){
	var body = 'Hello World';
	res.end(body);
});
*levels.push(JSON.parse(fs.readFileSync("E1M1")));
});
/*
app.get('/*', function(req, res){
	var body = 'Hello World';
	res.end(body);
});
*/

app.listen(88);
console.log("\nserver running on port 88\n\n");
