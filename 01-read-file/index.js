const fs = require('fs');
const path = require('node:path');

const stream = new fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');

stream.on('data', data => console.log(data));

