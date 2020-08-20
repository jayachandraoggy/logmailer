const fs = require('fs');

class fileSystem {

    constructor(path = '/tmp/history.log') {
        this.path = path;
    }

    appendLines(logs) {
        if (fs.existsSync(this.path)) {
            fs.unlink(this.path, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        logs.map((line) => {
            fs.appendFile(this.path, line + "\r\n", function (err) {
                if (err) {
                    console.log(err);
                }
            });
        })
    }
}

module.exports = fileSystem;