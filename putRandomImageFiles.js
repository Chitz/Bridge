var express = require('express');
var app = express();
var knox = require('knox');

//app.get('/',function(req,res){res.send('hello there!\n');});

var port = 9000;

var AWS = require('aws-sdk');

var client = knox.createClient({
    key: 'AKIAJPAGQ62LGL5NRKWQ',
	secret: '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',
 bucket: 'bridgeimages'
});

//var s3 = new AWS.S3();

 //s3.createBucket({Bucket: 'bridgeimages'}, function() {

  //var params = {Bucket: 'bridgeimages', Key: '2.txt', Body: 'Hello!'};

app.get('/', function(req,res){
client.getFile('regenerated_images/1.png', function(err, imageStream){
if(err)
 console.log(err);
else
 imageStream.pipe(res);

});
});
app.listen(port);
  //s3.putObject(params, function(err, data) {

  //    if (err)

    //      console.log(err)

     // else       console.log("Successfully uploaded data to bridgeimages/2.txt");

  // });

//});
