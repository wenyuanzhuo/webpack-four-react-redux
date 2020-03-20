const fs = require('fs')
const path = require('path');
const readFs = fs.createReadStream(path.resolve(__dirname, 'txt/txt1.json'), 'utf-8')
const writeFs = fs.createWriteStream(path.resolve(__dirname, 'txt/txt2.txt'), 'utf-8')
readFs.on('data', (chunk) => {
})
readFs.on('error',function(err){
  console.log('ERROR: ' + err);
})
readFs.on('end',() => {
  // console.log('end', chunks);
})
readFs.on('pipe', (chunk) => {
  
})
readFs.pipe(writeFs)
// writeFs.end()


console.log(path.join(__dirname), '\n' , path.join(__dirname))