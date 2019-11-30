import { clearScreen } from './shared/scrtiptRunner';
import { prompt } from 'inquirer'
import { readFileSync, writeFileSync } from 'fs';
import { getDotFiles, checkDotFilesExist } from './shared/fileOps';
import { git } from './shared/git';


export async function initSettings(debug: boolean) {
  clearScreen();

  const options = require('./options.json');

  // console.log(options);

  if (options.dotfilesFilePath === '') {
    const dotfileJsonPath: { selection: string } = await prompt([
      {
        type: 'input',
        message: 'Filepath of the folder that contains dotfiles.json?',
        name: 'selection',
      },
    ]);

    const dotFilePath = dotfileJsonPath.selection + 'dotfiles.json';

    try {
      const foundDotFilesJson = await JSON.parse(
        readFileSync(dotFilePath).toString()
      ) ? true : false

      if (foundDotFilesJson) {
        options.dotfilesFilePath = dotFilePath;
        writeFileSync('./src/options.json', JSON.stringify(options));
        console.log('-> Updated options.json')
      }

    } catch(e) {
      // console.log(e)
      console.log(`Cannot find dotfiles.json in ${dotfileJsonPath.selection}`);
    }


  } else {
    if(debug) console.log('-> Found dotfiles path')
  }

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

