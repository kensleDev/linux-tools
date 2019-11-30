"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const settings_1 = require("./settings");
const git_1 = require("./shared/git");
const installer_1 = require("./installer");
async function cli() {
    await settings_1.initSettings(settings_1._DEBUG);
    const mainMenu = await inquirer_1.prompt([
        {
            type: 'list',
            message: 'Main Menu',
            name: 'selection',
            choices: ['Installer', 'Push Dotfiles', 'Pull dotfiles'],
        },
    ]);
    if (mainMenu.selection === 'Installer') {
        installer_1.installer();
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