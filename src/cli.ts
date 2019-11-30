import { readdirSync } from 'fs';
import { prompt } from 'inquirer';
import { git } from './shared/git';
import { FileLocations, Installs } from './shared/models';
import { clearScreen, scriptRunner } from './shared/scrtiptRunner';
import { initSettings, checkDotFiles } from './settings';
import { getDotFiles, checkDotFilesExist } from './shared/fileOps';


const isWin = process.platform === 'win32';
const currentPlatform = isWin ? 'windows' : 'linux'
const debug = false

const locations: FileLocations = {
  scripts: `./src/assets/${currentPlatform}/installs/scripts`
}

export async function cli(): Promise<void> {

  initSettings(debug)

  await checkDotFiles(debug);

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

async function installer(): Promise<void> {

  clearScreen();

  const installScriptNames: string[] = readdirSync(locations.scripts);

  const installs: Installs = await prompt([
    {
      type: 'checkbox',
      message: 'Select what to install',
      name: 'scriptNames',
      choices: installScriptNames,
    },
  ]);

  installs.scriptNames.forEach(script => {
    if (isWin) {
      scriptRunner(`${locations.scripts}/${script}`).powershell();
    } else {
      scriptRunner(`${locations.scripts}/${script}`).bash();
    }
  });

}





// CHECK PATH FUNC
