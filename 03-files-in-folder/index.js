const { readdir: readdir } = require('fs/promises');
const { stat } = require('fs');
const path = require('path');

readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }).then((result) => {
    for (const file of result) {
        if (file.isFile()) {
            stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => console.log(file.name.split('.').at(0), '-', file.name.split('.').at(-1),'-', (stats.size/1024) + ' Kbytes'));
        }
    }
})

