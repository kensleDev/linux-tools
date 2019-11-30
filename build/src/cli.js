"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const inquirer_1 = require("inquirer");
const scrtiptRunner_1 = require("./shared/scrtiptRunner");
const settings_1 = require("./settings");
const isWin = process.platform === 'win32';
const currentPlatform = isWin ? 'windows' : 'linux';
const locations = {
    scripts: `./src/${currentPlatform}/installs/scripts`
};
async function cli() {
    settings_1.initSettings();
    await settings_1.checkDotFiles();
    // const menuChoice: { selection: string } = await prompt([
    //   {
    //     type: 'list',
    //     message: 'Main Menu',
    //     name: 'selection',
    //     choices: ['Installer', 'Push Dotfiles', 'Pull dotfiles'],
    //   },
    // ]);
    // if (menuChoice.selection === 'Installer') {
    //   // installer()
    // } else if (menuChoice.selection === 'Push Dotfiles') {
    //   git().push();
    // } else if (menuChoice.selection === 'Pull Dotfiles') {
    //   git().pull();
    // }
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