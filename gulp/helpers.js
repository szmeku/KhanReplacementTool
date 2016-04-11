'use strict';

var path = require('path'),
    _ = require('ramda');

function fileExtensionIs(extension, fileName){

    return fileName.slice(-extension.length) === extension;
}

function fileInFolder(folderPath, fileName){
    
    return path.parse(fileName).dir.indexOf(path.resolve(folderPath)) !== -1;
}

module.exports = {
    fileExtensionIs: _.curry(fileExtensionIs),
    fileInFolder: _.curry(fileInFolder)
};