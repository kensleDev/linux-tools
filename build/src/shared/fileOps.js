"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const constants_1 = require("constants");
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
function fileExist(filePath) {
    return new Promise((resolve, reject) => {
        fs_1.access(filePath, constants_1.F_OK, err => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            //file exists
            resolve(true);
        });
    });
}
// export function findDotFile(os: Os, dotFileName: string) {
//   const scriptExt = (os === 'linux') ? '.sh' : '.ps1'
//   const dotFileLocations = require('./options.json');
//   const currentDotFile = dotFileLocations[dotFileName];
//   console.log(commonFilePaths);
//   if (commonFilePaths !== undefined) {
//     const existingFiles: any = [];
//     commonFilePaths.forEach((path: string) => {
//       if (checkFileExists(`${path}\\${dotFileName}${scriptExt}`)) {
//         existingFiles.push({
//           [dotFileName]: path,
//         });
//       }
//     });
//     return existingFiles[0];
//   }
//   // const locations = () => {
//   //   let common, custom;
//   //   if (os === 'windows') {
//   //     common = require('./windows/dotfiles/common_locations.json');
//   //     custom = require('./windows/dotfiles/custom_locations.json');
//   //   } else if (os === 'linux') {
//   //     common = require('./linux/dotfiles/common_locations.json');
//   //     custom = require('./linux/dotfiles/custom_locations.json');
//   //   } else {
//   //     throw new Error('Unknown OS');
//   //   }
//   //   return {
//   //     common,
//   //     custom,
//   //   };
//   // };
//   // const commonFilePaths = locations().common[dotFileName];
//   // if (commonFilePaths !== undefined) {
//   //   const existingFiles: any = [];
//   //   commonFilePaths.forEach((path: string) => {
//   //     if (checkFileExists(`${path}\\${dotFileName}${scriptExt}`)) {
//   //       existingFiles.push({
//   //         [dotFileName]: path,
//   //       });
//   //     }
//   //   });
//   //   return existingFiles[0];
//   // }
// }
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
    const options = require('../options.json');
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