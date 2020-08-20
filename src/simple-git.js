const simpleGit = require('simple-git');

class SimpleGit {

    constructor(path, options = {binary: 'git'}) {
        this.git = simpleGit(path, options);
    }

    async checkLog() {
        return await this.git.log();
    }

    convertLineLogs(w) {
        let logs = [];
        Object.values(w.all)
            .map((ListLogLine) =>
            {
                logs.push(ListLogLine.date + ': ' +ListLogLine.author_name + ' - ' +ListLogLine.author_email + ' => ' + ListLogLine.message)
            });
        return logs;
    }
}

module.exports = SimpleGit;
