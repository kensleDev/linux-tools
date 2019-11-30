"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrtiptRunner_1 = require("./shared/scrtiptRunner");
const inquirer_1 = require("inquirer");
const fs_1 = require("fs");
const fileOps_1 = require("./shared/fileOps");
async function initSettings() {
    scrtiptRunner_1.clearScreen();
    const options = require('./options.json');
    // console.log(options);
    if (options.dotfilesFilePath === '') {
        const dotfileJsonPath = await inquirer_1.prompt([
            {
                type: 'input',
                message: 'Filepath of the folder that contains dotfiles.json?',
                name: 'selection',
            },
        ]);
        const dotFilePath = dotfileJsonPath.selection + 'dotfiles.json';
        try {
            const foundDotFilesJson = await JSON.parse(fs_1.readFileSync(dotFilePath).toString()) ? true : false;
            if (foundDotFilesJson) {
                options.dotfilesFilePath = dotFilePath;
                fs_1.writeFileSync('./src/options.json', JSON.stringify(options));
                console.log('-> Updated options.json');
            }
        }
        catch (e) {
            // console.log(e)
            console.log(`Cannot find dotfiles.json in ${dotfileJsonPath.selection}`);
        }
    }
    else {
        console.log('-> Found dotfiles path');
    }
}
exports.initSettings = initSettings;
async function checkDotFiles() {
    const dotfiles = await fileOps_1.getDotFiles();
    const missingDotfiles = await fileOps_1.checkDotFilesExist(dotfiles);
    console.log(missingDotfiles);
    // if (missingDotfiles.length === 0) {
    //   return missingDotfiles[0];
    // } else {
    //   return missingDotfiles;
    // }
    // console.log(missingDotfiles);
    // if (missingDotfiles.length !== 0) {
    //   console.log(missingDotfiles);
    // } else {
    //   console.log('no missing files');
    // }
    // if (missingDotfiles.length > 0) {
    //   console.log('There are missing dotfiles');
    //   const missingResult = await git().missingDotfiles(missingDotfiles);
    //   console.log(missingResult);
    //   return missingResult
    // }
    // return 'All dotfiles found and checked'
}
exports.checkDotFiles = checkDotFiles;
//# sourceMappingURL=settings.js.map