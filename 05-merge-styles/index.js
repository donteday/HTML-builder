const path = require('path');
const fs = require('fs');
const { readdir: readdir } = require('fs/promises');

fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', function (err) {
    if (err) throw err;
});

readdir(path.join(__dirname, 'styles'), { withFileTypes: true }).then((result) => {
    for (const file of result) {
        if (file.isFile() && path.extname(file.name) === '.css') {
            const stream = new fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf8');

            stream.on('data', data => {
                fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, function (err) {
                    if (err) throw err;
                });
            });
        }
    }
})