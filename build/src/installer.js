"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrtiptRunner_1 = require("./scrtiptRunner");
const fs_1 = require("fs");
const settings_1 = require("./settings");
const inquirer_1 = require("inquirer");
async function installer() {
    scrtiptRunner_1.clearScreen();
    const installScriptNames = fs_1.readdirSync(settings_1.locations.scripts);
    const installs = await inquirer_1.prompt([
        {
            type: 'checkbox',
            message: 'Select what to install',
            name: 'scriptNames',
            choices: installScriptNames,
        },
    ]);
    installs.scriptNames.forEach(script => {
        if (settings_1._IS_WIN) {
            scrtiptRunner_1.scriptRunner(`${settings_1.locations.scripts}/${script}`).powershell();
        }
        else {
            scrtiptRunner_1.scriptRunner(`${settings_1.locations.scripts}/${script}`).bash();
        }
    });
}
exports.installer = installer;
//# sourceMappingURL=installer.js.map