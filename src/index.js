const pkg = require('../package');
const CommandLineArguments = require('./command-line-arguments');
const SimpleGit = require('./simple-git');
const FileSystem = require('./file-system');
const sendMail = require('./mailer');

(async() => {
    try {

        const commandLineArguments = new CommandLineArguments(pkg.name, pkg.description, [
            {name: 'verbose', alias: 'v', type: Boolean, description: 'Show a verbose output', required: false},
            {
                name: 'projectPath',
                alias: 'S',
                type: String,
                description: 'The projectPath\'s absolute path',
                required: true
            },
            {
                name: 'toEmail',
                alias: 't',
                type: String,
                description: 'The toEmail address',
                required: true
            },
            {name: 'help', type: Boolean, defaultOption: false, description: 'Show this help message', required: false}
        ]);
        const filesystem = new FileSystem();
        const argv = commandLineArguments.getArguments();

        if (!argv.projectPath || !argv.toEmail || argv.help) {
            console.log(usage);
            process.exit();
        }

        const projectPath = argv.projectPath;
        const simpleGit = new SimpleGit(projectPath);

        let w = await simpleGit.checkLog();

        let logs = simpleGit.convertLineLogs(w);

        filesystem.appendLines(logs);

        const toEmail = argv.toEmail;
        await sendMail(toEmail);

        console.log("History sent to " + argv.toEmail);

    } catch (e) {
        console.log(e);
    }
})();