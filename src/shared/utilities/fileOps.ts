import { existsSync, readFileSync, copyFileSync } from 'fs';
import { prompt } from 'inquirer';

import { _OPTIONS, _IS_WIN, _CURRENT_PLATFORM, _LOCATIONS } from '../../settings';
import { Dotfile, DotfileProcessing, Os } from '../models';
import { git } from './git';
import { Logger } from '../logger';


export async function checkDotFilesExist(dotfiles: Dotfile[]): Promise<DotfileProcessing[]> {

  const seperator = _IS_WIN ? '\\' : '/';

  const locations: string[] = dotfiles.map(file => file.path + seperator + file.name);

  const missingFiles: DotfileProcessing[] = await getMissingFiles(locations);

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
  Logger.err('Missing Files');
  Logger.err('-----------------------------------------');
  Logger.err(files.join('\n'));
  Logger.err('');

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
    return msg;
  }
};

export async function copyDotfiles(op: 'push' | 'pull', files: Dotfile[], repoLocation: string, currentPlatform: Os): Promise<void> {

  const d = currentPlatform === 'windows' ? '\\' : '/';

  const results = files.map(dotfile => {
    const name = dotfile.name;
    const path = `${dotfile.path}${d}${dotfile.name}`;
    const repoPath = `${repoLocation}${d}src${d}assets${d}${currentPlatform}${d}dotfiles${d}${dotfile.name}`;
    // return copyFileSync(dotfile.path, repoPath);
    return { name, path, repoPath };
  })

  results.forEach(file => {
    if (op === 'pull') {
      copyFileSync(file.path, file.repoPath);
      Logger.info(`-> Copied ${file.name} to repo`);
    } else {
      copyFileSync(file.repoPath, file.path);
      Logger.info(`-> Copied ${file.name} to local`);
    }
  })

}

