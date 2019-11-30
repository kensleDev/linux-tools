"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const inquirer_1 = require("inquirer");
const git_1 = require("./shared/git");
const scrtiptRunner_1 = require("./shared/scrtiptRunner");
const settings_1 = require("./settings");
const isWin = process.platform === 'win32';
const currentPlatform = isWin ? 'windows' : 'linux';
const debug = false;
const locations = {
    scripts: `./src/assets/${currentPlatform}/installs/scripts`
};
async function cli() {
    settings_1.initSettings(debug);
    await settings_1.checkDotFiles(debug);
    const mainMenu = await inquirer_1.prompt([
        {
            type: 'list',
            message: 'Main Menu',
            name: 'selection',
            choices: ['Installer', 'Push Dotfiles', 'Pull dotfiles'],
        },
    ]);
    if (mainMenu.selection === 'Installer') {
        installer();
    }
    else if (mainMenu.selection === 'Push Dotfiles') {
        git_1.git().push();
    }
    else if (mainMenu.selection === 'Pull Dotfiles') {
        git_1.git().pull();
    }
}
exports.cli = cli;
async function installer() {
    scrtiptRunner_1.clearScreen();
    const installScriptNames = fs_1.readdirSync(locations.scripts);
    const installs = await inquirer_1.prompt([
        {
            type: 'checkbox',
            message: 'Select what to install',
            name: 'scriptNames',
            choices: installScriptNames,
        },
    ]);
    installs.scriptNames.forEach(script => {
        if (isWin) {
            scrtiptRunner_1.scriptRunner(`${locations.scripts}/${script}`).powershell();
        }
        else {
            scrtiptRunner_1.scriptRunner(`${locations.scripts}/${script}`).bash();
        }
    });
}
// CHECK PATH FUNC
//# sourceMappingURL=cli.js.map