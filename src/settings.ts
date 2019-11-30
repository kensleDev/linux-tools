import { clearScreen, scriptRunner } from './scrtiptRunner';
import { prompt } from 'inquirer'
import { readFileSync, writeFileSync } from 'fs';
import { getDotFiles, checkDotFilesExist } from './shared/fileOps';
import { git } from './shared/git';
import { FileLocations } from './shared/models';

export const _IS_WIN = process.platform === 'win32';
export const _CURRENT_PLATFORM = _IS_WIN ? 'windows' : 'linux';
export const _DEBUG = false;
export const _OPTIONS = require('./options.json');
export const _DOTFILES = require(_OPTIONS.dotfilesFilePath);

export const locations: FileLocations = {
  scripts: `./src/assets/${_CURRENT_PLATFORM}/installs/scripts`
};

console.log(locations);

export async function initSettings(debug: boolean) {
  clearScreen();

  // console.log(options);

  if (_OPTIONS.dotfilesFilePath === '') {
    const dotfileJsonPath: { selection: string } = await prompt([
      {
        type: 'input',
        message: 'Filepath of the folder that contains dotfiles.json?',
        name: 'selection',
      },
    ]);

    const dotFilePath = dotfileJsonPath.selection + 'dotfiles.json';

    try {
      const foundDotFilesJson = (await JSON.parse(
        readFileSync(dotFilePath).toString()
      ))
        ? true
        : false;

      if (foundDotFilesJson) {
        _OPTIONS.dotfilesFilePath = dotFilePath;
        writeFileSync('./src/options.json', JSON.stringify(_OPTIONS));
        console.log('-> Updated options.json');
      }
    } catch (e) {
      // console.log(e)
      console.log(`Cannot find dotfiles.json in ${dotfileJsonPath.selection}`);
    }
  } else {
    if (debug) console.log('-> Found dotfiles path');
  }

  await checkDotFiles(_DEBUG);

}

export async function checkDotFiles(debug: boolean) {
  const dotfiles = await getDotFiles();
  const missingDotfiles = await checkDotFilesExist(dotfiles);

  if (missingDotfiles !== false) {
    console.log('There are missing dotfiles');
    const missingResult = await git().missingDotfiles(missingDotfiles);
    console.log(missingResult);
  } else {
    if (debug) console.log('-> No missing files');
  }

}


