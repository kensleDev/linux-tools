"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const settings_1 = require("../settings");
async function checkFileExists(filePath) {
    try {
        const file = await fs_1.readFileSync(filePath);
        if (file !== undefined) {
            return filePath + ': true';
        }
        else {
            return filePath + ': false';
        }
    }
    catch (e) {
        // console.log(e)
    }
}
exports.checkFileExists = checkFileExists;
async function checkDotFilesExist(dotfiles) {
    const entries = Object.entries(dotfiles);
    const locations = entries.map(el => {
        const name = el[0];
        const path = el[1];
        const fullPath = path + '\\' + name;
        return fullPath;
    });
    const results = await locations.map((path) => {
        const exists = fs_1.existsSync(path);
        return [exists, path];
    });
    const missingFiles = results.map((result) => result[0] === false ? result : []);
    if (missingFiles[0].length === 0)
        return false;
    else
        return missingFiles;
}
exports.checkDotFilesExist = checkDotFilesExist;
function getDotFiles() {
    const options = settings_1._OPTIONS;
    try {
        const dotfilePath = options.dotfilesFilePath;
        return JSON.parse(fs_1.readFileSync(dotfilePath).toString());
    }
    catch (e) {
        console.log(e);
        // return e
    }
}
exports.getDotFiles = getDotFiles;
//# sourceMappingURL=fileOps.js.map