var express = require('express');
var knox = require('knox');
var app = express();
var port = 9000;
var _ = require('underscore');

var client = knox.createClient({
    key: 'AKIAJPAGQ62LGL5NRKWQ',
	secret: '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',
 bucket: 'bridgeimages'
});

var srcpath = "./dataset5/A/";
var newpath = "./train/";
var fs = require('fs'),
    path = require('path');

var rand = Math.random();

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

function getInValidFiles(srcpath) {
  console.log("Getting files", srcpath)
  return fs.readdirSync(srcpath).filter(function(file) {
    return file.startsWith("depth");
  });
}

function uploadFile(currentValue,index,arr){
  var dir = this;
  fs.rename(srcpath + dir + '/' + currentValue, newpath + dir + '/' + currentValue);
  // client.putFile(srcpath + dir + '/' + currentValue, dir + '/' + currentValue, function(err, res){
  //   if(err)
  //     console.log(err)
  //   else{
  //     console.log("Uploading file", dir + '/' + currentValue);
  //     res.resume();
  //   }
  // //   // Always either do something with `res` or at least call `res.resume()`.
  // });
}

function getSampleFiles(files){
  return _.sample(files,Math.floor(0.8*files.length));
}

function getFilesAndUpload(currentValue,index,arr){
  var sampleFiles = getSampleFiles(getValidFiles(srcpath + currentValue));
  sampleFiles.forEach(uploadFile, currentValue);
}

var alphabetDirectories = getDirectories(srcpath);

alphabetDirectories.forEach(getFilesAndUpload);


// client.putFile('color_0_0024.png', '/a.png', function(err, res){
//   res.resume();
//   // Always either do something with `res` or at least call `res.resume()`.
// });

app.listen(port);
