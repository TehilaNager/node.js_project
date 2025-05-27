const path = require('path');
const rfs = require('rotating-file-stream');

const accessLogStream = rfs.createStream(new Date().toLocaleDateString("he-IL"), {
    interval: '1d',
    path: path.join(__dirname, '../log')
});

module.exports = accessLogStream;