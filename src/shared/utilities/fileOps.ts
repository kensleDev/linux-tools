import { existsSync, readFileSync } from 'fs';
import { _OPTIONS, _IS_WIN } from '../../settings';
import { Dotfile, DotfileProcessing } from '../models';
import { prompt }  from 'inquirer'
import { git } from './git';

export function getDotFiles(): Dotfile[] {
  try {
    const dotfilePath = _OPTIONS.dotfilesFilePath;
    return JSON.parse(readFileSync(dotfilePath).toString());
  } catch (e) {
    console.log(e);
    return [{} as Dotfile]
  }
}

export async function checkDotFilesExist(dotfiles: Dotfile[]): Promise<DotfileProcessing[] | undefined> {

  const seperator = _IS_WIN ? '\\' : '/';

  const locations: string[] = dotfiles.map(file => file.path + seperator + file.name);

  const missingFiles: DotfileProcessing[] = await getMissingFiles(locations);

  // console.log(missingFiles);

  if (missingFiles.length > 0) return missingFiles;

}



async function getMissingFiles(locations: string[]): Promise<DotfileProcessing[]> {

  const processedLocations: DotfileProcessing[] = await locations.map(path => {
    const exists = existsSync(path);
    return { exists, path };
  });

  const missingFiles = [] as any;

  processedLocations.forEach((result: DotfileProcessing) => {
    if(result.exists === false) missingFiles.push(result)
  });

  return missingFiles;
}

export async function missingDotfilesResult(files: any[]): Promise<string> {
  console.log(files);
  console.log('Missing Files');
  console.log('-----------------------------------------');
  console.log(files.join('\n'));
  console.log('');

  const pullFiles = await prompt([
    {
      type: 'confirm',
      message: 'There are missing dotfiles, would you to pull them from git?',
      name: 'pullFiles',
    },
  ]);

  if (pullFiles) {
    // PULL FILES FROM GIT INTO REPO
    git().pull();
    // CP FILES TO CORRECT LOCATIONS
    return '';
  } else {
    console.log(
      'Please add the dotfiles to the correct locations and ensure that dotfiles.json has a correct refernce to that file'
    );

    return 'Please add the dotfiles to the correct locations and ensure that dotfiles.json has a correct refernce to that file';
  }
};
