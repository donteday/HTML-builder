const fs = require('fs');
const path = require('path');
const { mkdir } = require('node:fs/promises');
const { readdir: readdir } = require('fs/promises');
const { copyFile } = require('fs/promises');
const stream = new fs.createReadStream(path.join(__dirname, 'template.html'), 'utf8');

let htmlResult = '';

const projectPath = path.join(__dirname, 'project-dist');
const componentsPath = path.join(__dirname, 'components');
const htmlPath = path.join(projectPath, 'index.html');
const cssPath = path.join(projectPath, 'style.css');
const assetsPath = path.join(projectPath, 'assets');

mkdir(projectPath, { recursive: true });
mkdir(assetsPath, { recursive: true });

fs.appendFile(cssPath, '', function (err) {
    if (err) throw err;
});

stream.on('data', data => {
    htmlResult = data;

    readdir(componentsPath, { withFileTypes: true }).then((files) => {
        for (const file of files) {
            if (file.isFile()) {
                let comp = fs.createReadStream(path.join(componentsPath, file.name), 'utf8');
                comp.on('data', data => {
                    htmlResult = htmlResult.replace(`{{${path.basename(path.join(componentsPath, file.name), '.html')}}}`, data);
                });
                comp.on('end', () => {
                    fs.writeFile(htmlPath, htmlResult, function (err) {
                        if (err) throw err;
                    });
                });
            }
        }
    })
});

readdir(path.join(__dirname, 'styles'), { withFileTypes: true }).then((result) => {
    for (const file of result) {
        if (file.isFile() && path.extname(file.name) === '.css') {
            const stream = new fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf8');

            stream.on('data', data => {
                fs.appendFile(cssPath, data, function (err) {
                    if (err) throw err;
                });
            });
        }
    }
})

readdir(path.join(__dirname, 'assets'), { withFileTypes: true }).then((result) => {
    for (const file of result) {
        if (!file.isFile()) {
            mkdir(path.join(assetsPath, file.name), { recursive: true });

            readdir(path.join(__dirname, 'assets', file.name), { withFileTypes: true }).then((assets) => {
                for (const asset of assets) {
                    copyFile(path.join(__dirname, 'assets', file.name, asset.name), path.join(__dirname, 'project-dist', 'assets', file.name, asset.name));
                }
            });
        }
    }
})