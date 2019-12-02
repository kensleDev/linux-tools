import { prompt } from 'inquirer';
import { installer } from '../installer/installer';
import { initSettings, _DEBUG, _DOTFILES } from '../settings';
import { git } from '../shared/utilities/git';
import { fileWatcher } from '../dotfiles/fileWatcher';
import { uploadDotfiles } from '../dotfiles/upDownLoad';

console.log(process.argv)

export async function cli(): Promise<void> {

  await initSettings(_DEBUG);

  const mainMenu: { selection: string } = await prompt([
    {
      type: 'list',
      message: 'Main Menu',
      name: 'selection',
      choices: ['Installer', 'Upload Dotfiles', 'Download Dotfiles', 'File Watcher' ],
    },
  ]);

  if (mainMenu.selection === 'Installer') {
    installer()
  // } else if (mainMenu.selection === 'File Watcher') {
  //   fileWatcher()
  } else if (mainMenu.selection === 'Upload Dotfiles') {
    uploadDotfiles()
  } else if (mainMenu.selection === 'Download Dotfiles') {

  }

}


