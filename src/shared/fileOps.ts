import { existsSync, readFileSync } from 'fs';
import { _OPTIONS } from '../settings';

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

export async function checkDotFilesExist(dotfiles: any) {


  const entries = Object.entries(dotfiles);

  const locations = entries.map(el => {
    const name = el[0]
    const path = el[1]

    const fullPath = path + '\\' + name;

    return fullPath
  })


  const results = await locations.map((path) => {
    const exists = existsSync(path);
    return [exists, path];
  })

  const missingFiles = results.map((result: any[]) =>
    result[0] === false ? result : []
  );

  if (missingFiles[0].length === 0) return false
  else return missingFiles

}


export function getDotFiles() {
  const options = _OPTIONS;

  try {
    const dotfilePath = options.dotfilesFilePath;
    return JSON.parse(readFileSync(dotfilePath).toString());

  } catch(e) {
    console.log(e);
    // return e
  }

}
