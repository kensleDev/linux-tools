"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const installer_1 = require("../installer/installer");
const settings_1 = require("../settings");
const git_1 = require("../shared/utilities/git");
const fileWatcher_1 = require("../fileWatcher/fileWatcher");
console.log(process.argv);
async function cli() {
    await settings_1.initSettings(settings_1._DEBUG);
    const mainMenu = await inquirer_1.prompt([
        {
            type: 'list',
            message: 'Main Menu',
            name: 'selection',
            choices: ['Installer', 'File Watcher', 'Push Dotfiles', 'Pull dotfiles'],
        },
    ]);
    if (mainMenu.selection === 'Installer') {
        installer_1.installer();
    }
    else if (mainMenu.selection === 'File Watcher') {
        fileWatcher_1.fileWatcher();
    }
    else if (mainMenu.selection === 'Push Dotfiles') {
        git_1.git().push();
    }
    else if (mainMenu.selection === 'Pull Dotfiles') {
        git_1.git().pull();
    }
}
exports.cli = cli;
//# sourceMappingURL=cli.js.map