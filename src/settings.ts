import { clearScreen, scriptRunner } from './scriptRunner/scrtiptRunner';
import { prompt } from 'inquirer'
import { readFileSync, writeFileSync } from 'fs';
import { checkDotFilesExist, missingDotfilesResult } from './shared/utilities/fileOps';
import { git } from './shared/utilities/git';
import { FileLocations, Dotfile, DotfileProcessing } from './shared/models';
import { Logger } from './shared/logger';

export const _DEBUG = true;
export const _IS_WIN = process.platform === 'win32';
export const _CURRENT_PLATFORM = _IS_WIN ? 'windows' : 'linux';

export const _USER_CONFIG_PATH = _IS_WIN
  ? 'C:\\Users\\kd\\Documents\\dotfiles.json'
  : '/lib/dotfiles.json';

export const _USER_CONFIG = require(_USER_CONFIG_PATH);

export const _OPTIONS = _USER_CONFIG.options
export const _DOTFILES = _USER_CONFIG.dotfiles

export const _LOCATIONS: FileLocations = {
  repoLocation: _OPTIONS.repoLocation,
  installScripts: `./src/assets/${_CURRENT_PLATFORM}/installs/scripts`,
  scripts: `./src/assets/${_CURRENT_PLATFORM}/scripts`,
  logLocation: _IS_WIN ? 'C:\\Users\\kd\\Documents\\dotfileLog.txt' : ''
};

export async function initSettings(debug: boolean) {
  clearScreen();

  if (_OPTIONS.dotfiledsFilePath === '') {
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
        Logger.log('Updated options.json');
      }
    } catch (e) {
      Logger.err(`Cannot find dotfiles.json in ${dotfileJsonPath.selection}`);
    }
  } else {
    if (debug) Logger.info('Found dotfiles path');
  }

  await checkDotFiles(_DEBUG);

}

export async function checkDotFiles(debug: boolean) {
  const dotfiles: Dotfile[] = _DOTFILES;
  const missingDotfiles: DotfileProcessing[] | undefined = await checkDotFilesExist(dotfiles);

  if (missingDotfiles && missingDotfiles.length > 0) {
    const missingResult = await missingDotfilesResult(missingDotfiles);
  } else {
    if (debug) Logger.info('No missing files');
  }

}


