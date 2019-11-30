"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
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
    const results = [];
    locations.forEach(async (path) => {
        try {
            await fs_1.promises.access(path);
            results.push([true, path]);
        }
        catch (error) {
            results.push([false, path]);
            // console.log(results);
            return results;
        }
    });
    console.log(locations);
    // const missingFiles = results.map((result: any[]) =>
    //   result[0] === false ? result : []
    // );
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