import { existsSync, readFileSync, copyFileSync } from 'fs';
import { prompt } from 'inquirer';

import { _OPTIONS, _IS_WIN, _CURRENT_PLATFORM, _DELIMINATOR, _LOCATIONS } from '../../settings';
import { Dotfile, DotfileProcessing } from '../models';
import { git } from './git';


export async function checkDotFilesExist(dotfiles: Dotfile[]): Promise<DotfileProcessing[]> {

  const seperator = _IS_WIN ? '\\' : '/';

  const locations: string[] = dotfiles.map(file => file.path + seperator + file.name);

  const missingFiles: DotfileProcessing[] = await getMissingFiles(locations);

  // console.log(missingFiles);

  if (missingFiles.length > 0) return missingFiles;
  else return []

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
    const gitPullResult = git(_LOCATIONS.repoLocation).pull();
    // CP FILES TO CORRECT LOCATIONS
    return gitPullResult;
  } else {
    const msg = 'Please add the dotfiles to the correct locations and ensure that dotfiles.json has a correct refernce to that file'
    console.log(msg);
    return msg;
  }
};

export async function copyDotfilesToRepo(files: Dotfile[], repoLocation: string, currentPlatform: 'windows' | 'linux') {

  const d = _DELIMINATOR

  const results = files.map(dotfile => {
    const name = dotfile.name;
    const path = `${dotfile.path}${d}${dotfile.name}`;
    const repoPath = `${repoLocation}${d}src${d}assets${d}${currentPlatform}${d}dotfiles${d}${dotfile.name}`;
    // return copyFileSync(dotfile.path, repoPath);
    return { name, path, repoPath };
  })

  results.forEach(file => {
    copyFileSync(file.path, file.repoPath)
    console.log(`-> Copied ${file.name} into repo`);
  })


}
