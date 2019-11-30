import { clearScreen, scriptRunner } from '../scrtiptRunner';
import { readdirSync } from 'fs';
import { Installs } from './models';
import { _IS_WIN, locations } from '../settings';
import { prompt } from 'inquirer';

export async function installer(): Promise<void> {
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
    if (_IS_WIN) {
      scriptRunner(`${locations.scripts}/${script}`).powershell();
    } else {
      scriptRunner(`${locations.scripts}/${script}`).bash();
    }
  });
}
