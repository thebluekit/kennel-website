import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();

function downScale(imagePath, height) {
  sharp(imagePath)
  .resize({
    fit: sharp.fit.contain,
    height: height
  })
  .toBuffer(function(err, buffer) {
    fs.writeFile(imagePath, buffer, function(e) {
    });
  });
}

function getDirFiles (dirPath) {
  let directoryPath = path.join(__dirname, dirPath);
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 
      files.forEach(function (file) {
          console.log(file); 
      });
    });
}

export {downScale}