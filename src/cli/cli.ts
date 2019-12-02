import { prompt } from 'inquirer';
import { uploadDotfiles, downloadDotfiles } from '../dotfiles/upDownLoad';
import { initSettings, _DEBUG } from '../settings';
import { installer } from '../installer/installer';
import { fileWatcher } from '../dotfiles/fileWatcher';
import { Logger } from '../shared/logger';


export async function cli(): Promise<void> {

  Logger.title(`CLI APP STARTED`)

  await initSettings(_DEBUG);

  const mainMenu: { selection: string } = await prompt([
    {
      type: 'list',
      message: 'Main Menu',
      name: 'selection',
      choices: ['Upload Dotfiles', 'Download Dotfiles', 'Installer', 'File Watcher' ],
    },
  ]);

  if (mainMenu.selection === 'Installer') {
    installer()
  } else if (mainMenu.selection === 'File Watcher') {
    fileWatcher()
  } else if (mainMenu.selection === 'Upload Dotfiles') {
    uploadDotfiles()
  } else if (mainMenu.selection === 'Download Dotfiles') {
    downloadDotfiles()
  }

}


