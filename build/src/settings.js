"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrtiptRunner_1 = require("./scriptRunner/scrtiptRunner");
const inquirer_1 = require("inquirer");
const fs_1 = require("fs");
const fileOps_1 = require("./shared/utilities/fileOps");
exports._IS_WIN = process.platform === 'win32';
exports._CURRENT_PLATFORM = exports._IS_WIN ? 'windows' : 'linux';
exports._DEBUG = false;
exports._USER_CONFIG_PATH = exports._IS_WIN
    ? 'C:\\Users\\kd\\Documents\\dotfiles.json'
    : '/lib/dotfiles.json';
exports._USER_CONFIG = require(exports._USER_CONFIG_PATH);
exports._OPTIONS = exports._USER_CONFIG.options;
exports._DOTFILES = exports._USER_CONFIG.dotfiles;
exports.locations = {
    scripts: `./src/assets/${exports._CURRENT_PLATFORM}/installs/scripts`
};
async function initSettings(debug) {
    scrtiptRunner_1.clearScreen();
    if (exports._OPTIONS.dotfiledsFilePath === '') {
        const dotfileJsonPath = await inquirer_1.prompt([
            {
                type: 'input',
                message: 'Filepath of the folder that contains dotfiles.json?',
                name: 'selection',
            },
        ]);
        const dotFilePath = dotfileJsonPath.selection + 'dotfiles.json';
        try {
            const foundDotFilesJson = (await JSON.parse(fs_1.readFileSync(dotFilePath).toString()))
                ? true
                : false;
            if (foundDotFilesJson) {
                exports._OPTIONS.dotfilesFilePath = dotFilePath;
                fs_1.writeFileSync('./src/options.json', JSON.stringify(exports._OPTIONS));
                console.log('-> Updated options.json');
            }
        }
        catch (e) {
            // console.log(e)
            console.log(`Cannot find dotfiles.json in ${dotfileJsonPath.selection}`);
        }
    }
    else {
        if (debug)
            console.log('-> Found dotfiles path');
    }
    await checkDotFiles(exports._DEBUG);
}
exports.initSettings = initSettings;
async function checkDotFiles(debug) {
    const dotfiles = await fileOps_1.getDotFiles();
    const missingDotfiles = await fileOps_1.checkDotFilesExist(dotfiles);
    if (missingDotfiles && missingDotfiles.length > 0) {
        const missingResult = await fileOps_1.missingDotfilesResult(missingDotfiles);
        // console.log(missingResult);
    }
    else {
        if (debug)
            console.log('-> No missing files');
    }
}
exports.checkDotFiles = checkDotFiles;
//# sourceMappingURL=settings.js.map