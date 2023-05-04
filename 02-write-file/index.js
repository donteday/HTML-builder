const fs = require('fs');
const path = require('path');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

fs.appendFile(path.join(__dirname, 'myfile.txt'), '', function (err) {
    if (err) throw err;
});

console.log('Hello! Write your text:');

rl.on('SIGINT', () => {
    console.log('Goodbye :\'(');
    rl.close();
});

rl.on('line', (input) => {
    if (input === 'exit') {
        console.log('Goodbye :\'(');
        rl.close();
        return;
    }
    fs.appendFile(path.join(__dirname, 'myfile.txt'), input, function (err) {
        if (err) throw err;
    });
});