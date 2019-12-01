import { existsSync, readFileSync } from 'fs';
import { _OPTIONS } from '../../settings';
import { Dotfile, DotfileProcessing } from '../models';


export function getDotFiles(): Dotfile[] {
  try {
    const dotfilePath = _OPTIONS.dotfilesFilePath;
    return JSON.parse(readFileSync(dotfilePath).toString());
  } catch (e) {
    console.log(e);
    return [{} as Dotfile]
  }
}

export async function checkDotFilesExist(dotfiles: Dotfile[]) {

  const locations: string[] = getDotfileLocations(dotfiles);

  const missingFiles: DotfileProcessing[] = await getMissingFiles(locations);

  if (missingFiles.length === 0) return false
  else return missingFiles

}

function getDotfileLocations(dotfiles: Dotfile[]) {
  const entries = Object.entries(dotfiles);

  const locations = entries.map(el => {
    const name = el[0];
    const path = el[1];

    const fullPath = path + '\\' + name;

    return fullPath;
  });

  return locations;
}

async function getMissingFiles(locations: string[]): Promise<DotfileProcessing[]> {
  const processedLocations: DotfileProcessing[] = await locations.map(path => {
    const exists = existsSync(path);
    return { exists, path };
  });

  let missingFiles = [] as any;

  missingFiles = processedLocations.map((result: DotfileProcessing) =>
    result.exists === false ? result : []
  );

  return missingFiles;
}

