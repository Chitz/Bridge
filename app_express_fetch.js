var express = require('express');
var knox = require('knox');
var app = express();
var port = 9000;
var _ = require('underscore');
var async_ = require('async');

var client = knox.createClient({
    key: 'AKIAJPAGQ62LGL5NRKWQ',
	secret: '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',
 bucket: 'bridgeimages'
});

var srcpath = "./dataset5/A/";
var fs = require('fs'),
    path = require('path');

var rand = Math.random();

var req = "hello";

dirpath = "dataset";

var filePath = {};



var AlphabetUrlMap = {};
AlphabetUrlMap["h"] = "dataset/h/color_7_0446.png";
AlphabetUrlMap["e"] = "dataset/e/color_4_0375.png";
AlphabetUrlMap["l"] = "dataset/l/color_11_0488.png";
AlphabetUrlMap["o"] = "dataset/o/color_14_0197.png";




req.split("").forEach(function(currentValue, index){

  if(currentValue != ""){
    console.log(AlphabetUrlMap[currentValue]);
    setTimeout(displayImage(AlphabetUrlMap[currentValue]), 100);
    //getFile(currentValue);
    //async_.waterfall(getFile(index));
    //console.log("For ", currentValue, " File ", signFile);
  }
});




var varGetFile = {
getFile: function (curr, callback){
  console.log(curr);
  searchpath = dirpath + '/' + curr;
  var sampleFile = ""
  client.list({ prefix: searchpath}, function(err, data){
    console.log(curr);
    if(err)
      console.log(err)
    else{
      var jsonContent = JSON.parse(JSON.stringify(data.Contents));
      //console.log(dirpath, JSON.stringify(data.Contents), jsonContent.length);
      if(jsonContent.length <= 1)
        return null;
      sampleFile = jsonContent[Math.floor(Math.random() * (jsonContent.length - 1)) + 1].Key;
      displayImage(sampleFile);
      //filePath[index] = sampleFile;
      // if(Object.keys(filePath).length == req.length - 1){
      //   displayAll();
      //   // call display function
      //
      // }
      //console.log(filePath, Object.keys(filePath).length, req.length);
      console.log(sampleFile);

      //return sampleFile;
    }
  }).end(displayAll1());
  setTimeout(function(){callback(null, sampleFile);}, 200);
}
};

function displayAll1(){
  console.log("done");
}

// async_.map(['h', 'e', 'l', 'l', 'o'], varGetFile.getFile.bind(varGetFile), function(err, sampleFile){
// console.log(sampleFile);
// });

function displayImage(sampleFile){
  console.log("Displaying image UP ", sampleFile);
  app.get('/', function(req,res){
    console.log("Displaying image ", sampleFile);
  client.getFile("/" + sampleFile, function(err, imageStream){
  if(err)
   console.log(err);
  else{
   imageStream.pipe(res);
   //counter += 1;
 }
  });
  });
}

function displayAll(){
  var counter = 0;
  while(counter < req.length){

    app.get('/', function(req,res){
      console.log("Displaying image ", filePath[counter]);
    client.getFile("/" + filePath[counter], function(err, imageStream){
    if(err)
     console.log(err);
    else{
     imageStream.pipe(res);
     counter += 1;
   }
    });
    });
  }
}

function startSearching(req){
  // async_.eachSeries(req.split(""), function(currentValue){
  //   if(currentValue != ""){
  //     console.log(currentValue);
  //     var signFile = getFile(dirpath + '/' + currentValue);
  //     console.log("For ", currentValue, " File ", signFile);
  //   }
  // }, function(){
  //   console.log("for each finished");
  // })
  req.split("").forEach(function(currentValue, index){
    if(currentValue != ""){
      console.log(currentValue);
      //displayImage(currentValue);
      getFile(currentValue);
      //async_.waterfall(getFile(index));
      //console.log("For ", currentValue, " File ", signFile);
    }
 });
}

//startSearching(req)

//getFile()
function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getValidFiles(srcpath) {
  console.log("Getting files", srcpath)
  return fs.readdirSync(srcpath).filter(function(file) {
    return file.startsWith("color");
  });
}

function uploadFile(currentValue,index,arr){
  var dir = this;
  client.putFile(srcpath + dir + '/' + currentValue, dir + '/' + currentValue, function(err, res){
    if(err)
      console.log(err)
    else{
      console.log("Uploading file", dir + '/' + currentValue);
      res.resume();
    }
  //   // Always either do something with `res` or at least call `res.resume()`.
  });
}

function getSampleFiles(files){
  return _.sample(files,2);
}

function getFilesAndUpload(currentValue,index,arr){
  var sampleFiles = getSampleFiles(getValidFiles(srcpath + currentValue));
  sampleFiles.forEach(uploadFile, currentValue);
}

//var alphabetDirectories = getDirectories(srcpath);



//alphabetDirectories.forEach(getFilesAndUpload)

//getFiles(dirpath);

// client.putFile('color_0_0024.png', '/a.png', function(err, res){
//   res.resume();
//   // Always either do something with `res` or at least call `res.resume()`.
// });



app.listen(port);
