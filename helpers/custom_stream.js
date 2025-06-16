const rfs = require("rotating-file-stream");
const path = require("path");

class CustomStream {
    stream;

    write(data) {
        if (!this.stream)
            this.stream = rfs.createStream(new Date().toLocaleDateString("he-IL"), {
                interval: '1d',
                path: path.join(__dirname, '../log')
            });
        this.stream.write(data);
    }
}

module.exports = CustomStream;
