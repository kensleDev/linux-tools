import { prompt } from 'inquirer';
import { checkDotFiles, initSettings, _DEBUG, locations, _DOTFILES } from './settings';
import { git } from './shared/git';
import { installer } from './installer';

export async function cli(): Promise<void> {

  await initSettings(_DEBUG);

  console.log(_DOTFILES)

  const mainMenu: { selection: string } = await prompt([
    {
      type: 'list',
      message: 'Main Menu',
      name: 'selection',
      choices: ['Installer', 'Push Dotfiles', 'Pull dotfiles'],
    },
  ]);

  if (mainMenu.selection === 'Installer') {
    installer()
  } else if (mainMenu.selection === 'Push Dotfiles') {
    git().push();
  } else if (mainMenu.selection === 'Pull Dotfiles') {
    git().pull();
  }

}


