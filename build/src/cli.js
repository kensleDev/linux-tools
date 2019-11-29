"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const fs_1 = require("fs");
const isWin = process.platform === 'win32';
const locations = {
    bash_scripts: './src/linux/installs/scripts',
};
async function cli() {
    const menuChoice = await inquirer_1.prompt([
        {
            type: 'list',
            message: 'Main Menu',
            name: 'menuChoice',
            choices: ['Installer', 'Push Dotfiles', 'Pull dotfiles'],
        },
    ]);
    if (menuChoice === 'Installer') {
        await installer();
    }
    else if (menuChoice === 'Push Dotfiles') {
        git().push();
    }
    else if (menuChoice === 'Pull Dotfiles') {
        git().pull();
    }
}
exports.cli = cli;
async function installer() {
    const installScriptNames = fs_1.readdirSync(locations.bash_scripts);
    const installs = await inquirer_1.prompt([
        {
            type: 'checkbox',
            message: 'Select what to install',
            name: 'scriptNames',
            choices: installScriptNames,
        },
    ]);
    installs.scriptNames.forEach(script => {
    });
    console.log(installs);
}
function git() {
    const push = () => {
        console.log('push');
    };
    const pull = () => {
        console.log('pull');
    };
    return {
        push,
        pull,
    };
}
//# sourceMappingURL=cli.js.map