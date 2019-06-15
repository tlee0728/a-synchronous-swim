const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg'); 
////////////////////////////////////////////////////////
console.log(module.exports.backgroundImageFile);

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);

  if (req.method === 'GET') {
    if (req.url === '/') {
      if (messageQueue === null) {
        res.end('no moves left');
      } else {  
        res.end(messageQueue.dequeue());
      }
    } else if (req.url === '/background.jpg') {
      
      // fs.exists(module.exports.backgroundImageFile, function(exists) {
      //   if (exists) {
      //     res.writeHead(200, {
      //       'Content-Type': 'application/octet-stream',
      //       'Content-Disposition': 'attachment; filename=' + module.exports.backgroundImageFile
      //     });
      //     fs.createReadStream(module.exports.backgroundImageFile).pipe(res);
      //   }
      // })
      
     
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {

        if (err) {
          res.writeHead(404);
        } else {
          res.writeHead(200,{'Content-type': 'image/jpg'});
          console.log(data);
          res.write(data, 'binary');
          res.end();
          console.log('in second get');

        }
      });
    }
  } else {
    res.end();
  }
  
  next(); // invoke next() at the end of a request to help with testing!
};

// 127.0.0.1:3000/backgroundImageFile