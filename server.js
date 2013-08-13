var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var app = express();

app.use(express.logger());


var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/test';
mongoose.connect(mongoUri);


var db = mongoose.connection;

var kittySchema;
var kitten;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
    console.log("Mongo Connection Opened Successfully.  Woo!!! connected to mongo! wooo!  :)");

    kittySchema = mongoose.Schema({ name: String });

    // NOTE: methods must be added to the schema before compiling it with mongoose.model()
    kittySchema.methods.speak = function () {
	var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
	console.log(greeting);
    };
    Kitten = mongoose.model('Kitten', kittySchema);

    var silence = new Kitten({ name: 'Silence' });
    silence.speak();
    console.log(silence.name); // 'Silence';

    var fluffy = new Kitten({ name: 'fluffy' });
    fluffy.speak(); // "Meow name is fluffy"

    fluffy.save(function (err, fluffy) {
	if (err) {// TODO handle the error
	    fluffy.speak();
	}
	else {
	    console.log("Saved: " + fluffy.name);
	}
    });

    Kitten.find(function (err, kittens) {
	if (err) { // TODO handle err
	}
	else {
	    console.log(kittens);
	}
    });

    Kitten.find({ name: /^Fluff/ }, function() { console.log(this); });

});


app.get('/', function(request, response) {
//  response.send('Hello awesome World!  Dude this is totally awesmoe!!! My first web server!!!!');

    var buffer = fs.readFileSync("index.html");
    var len = buffer.length;
    response.send (buffer.toString('utf8',0, len));

});



app.get('/mongo', function(request, response) {

    var silence = new Kitten({ name: 'Silence' });
    silence.speak();
    console.log(silence.name); // 'Silence';

    var fluffy = new Kitten({ name: 'fluffy' });
    var whatFluffySays = fluffy.speak(); // "Meow name is fluffy"

    response.send("Fluffy say:" + whatFluffySays);

});




var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
