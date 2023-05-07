const path = require('path');
const { mkdir } = require('node:fs/promises');
const { readdir: readdir } = require('fs/promises');
const { copyFile } = require('fs/promises');

mkdir(path.join(__dirname, 'files-copy'), { recursive: true });

readdir(path.join(__dirname, 'files'), { withFileTypes: true }).then((result) => {
    for (const file of result) {
        copyFile(path.join(__dirname,'files', file.name), path.join(__dirname, 'files-copy', file.name));
    }
})
  
