"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const settings_1 = require("../../settings");
const inquirer_1 = require("inquirer");
const git_1 = require("./git");
function getDotFiles() {
    try {
        const dotfilePath = settings_1._OPTIONS.dotfilesFilePath;
        return JSON.parse(fs_1.readFileSync(dotfilePath).toString());
    }
    catch (e) {
        console.log(e);
        return [{}];
    }
}
exports.getDotFiles = getDotFiles;
async function checkDotFilesExist(dotfiles) {
    const seperator = settings_1._IS_WIN ? '\\' : '/';
    const locations = dotfiles.map(file => file.path + seperator + file.name);
    const missingFiles = await getMissingFiles(locations);
    // console.log(missingFiles);
    if (missingFiles.length > 0)
        return missingFiles;
}
exports.checkDotFilesExist = checkDotFilesExist;
async function getMissingFiles(locations) {
    const processedLocations = await locations.map(path => {
        const exists = fs_1.existsSync(path);
        return { exists, path };
    });
    const missingFiles = [];
    processedLocations.forEach((result) => {
        if (result.exists === false)
            missingFiles.push(result);
    });
    return missingFiles;
}
async function missingDotfilesResult(files) {
    console.log(files);
    console.log('Missing Files');
    console.log('-----------------------------------------');
    console.log(files.join('\n'));
    console.log('');
    const pullFiles = await inquirer_1.prompt([
        {
            type: 'confirm',
            message: 'There are missing dotfiles, would you to pull them from git?',
            name: 'pullFiles',
        },
    ]);
    if (pullFiles) {
        // PULL FILES FROM GIT INTO REPO
        git_1.git().pull();
        // CP FILES TO CORRECT LOCATIONS
        return '';
    }
    else {
        console.log('Please add the dotfiles to the correct locations and ensure that dotfiles.json has a correct refernce to that file');
        return 'Please add the dotfiles to the correct locations and ensure that dotfiles.json has a correct refernce to that file';
    }
}
exports.missingDotfilesResult = missingDotfilesResult;
;
//# sourceMappingURL=fileOps.js.map