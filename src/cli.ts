import { prompt } from 'inquirer'
import { readdirSync } from 'fs';
import { Git } from './shared/models';

const isWin = process.platform === 'win32';

const locations = {
  bash_scripts: './src/linux/installs/scripts',
};

export async function cli(): Promise<void> {

  const menuChoice: string = await prompt([
    {
      type: 'list',
      message: 'Main Menu',
      name: 'menuChoice',
      choices: ['Installer', 'Push Dotfiles', 'Pull dotfiles'],
    },
  ]);


  if (menuChoice === 'Installer') {
    await installer()
  } else if (menuChoice === 'Push Dotfiles') {
    git().push()
  } else if (menuChoice === 'Pull Dotfiles') {
    git().pull();
  }

}


async function installer(): Promise<void> {
  const installScriptNames = readdirSync(locations.bash_scripts);

  const installs: { scriptNames: string[] } = await prompt([
    {
      type: 'checkbox',
      message: 'Select what to install',
      name: 'scriptNames',
      choices: installScriptNames,
    },
  ]);


  installs.scriptNames.forEach(script => {

  });

  console.log(installs);
}


function git(): Git {
  const push = (): void => {
    console.log('push')
  };

  const pull = (): void => {
    console.log('pull')
  };

  return {
    push,
    pull,
  };
}

