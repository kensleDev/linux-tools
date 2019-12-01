import { prompt } from 'inquirer';
import { installer } from '../installer/installer';
import { initSettings, _DEBUG, _DOTFILES } from '../settings';
import { git } from '../shared/utilities/git';
import { fileWatcher } from '../fileWatcher/fileWatcher';

export async function cli(): Promise<void> {

  await initSettings(_DEBUG);

  const mainMenu: { selection: string } = await prompt([
    {
      type: 'list',
      message: 'Main Menu',
      name: 'selection',
      choices: ['Installer', 'File Watcher', 'Push Dotfiles', 'Pull dotfiles'],
    },
  ]);

  if (mainMenu.selection === 'Installer') {
    installer()
  } else if (mainMenu.selection === 'File Watcher') {
    fileWatcher()
  } else if (mainMenu.selection === 'Push Dotfiles') {
    git().push();
  } else if (mainMenu.selection === 'Pull Dotfiles') {
    git().pull();
  }

}


