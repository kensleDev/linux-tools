import { readFileSync, access, promises } from 'fs';
import { Os } from './models';
import { F_OK } from 'constants';

export async function checkFileExists(filePath: string) {
  try {
    const file = await readFileSync(filePath);
    if (file !== undefined) {
      return filePath + ': true';
    } else {
      return filePath + ': false';
    }
  } catch (e) {
    // console.log(e)
  }
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


export async function checkDotFilesExist(dotfiles: any) {


  const entries = Object.entries(dotfiles);

  const locations = entries.map(el => {
    const name = el[0]
    const path = el[1]

    const fullPath = path + '\\' + name;

    return fullPath
  })


  const results: any = []

  locations.forEach(async (path) => {
    try {
      await promises.access(path);
      results.push([true, path]);
    }
    catch (error) {
      results.push([false, path]);
      // console.log(results);
      return results
    }

  })

  console.log(locations);


  // const missingFiles = results.map((result: any[]) =>
  //   result[0] === false ? result : []
  // );


}


export function getDotFiles() {
  const options = require('../options.json');

  try {
    const dotfilePath = options.dotfilesFilePath;
    return JSON.parse(readFileSync(dotfilePath).toString());

  } catch(e) {
    console.log(e);
    // return e
  }

}
