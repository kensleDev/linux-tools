import { clearScreen, scriptRunner } from '../scriptRunner/scrtiptRunner';
import { readdirSync } from 'fs';
import { Installs } from '../shared/models';
import { _IS_WIN, _LOCATIONS } from '../settings';
import { prompt } from 'inquirer';

export async function installer(): Promise<void> {
  clearScreen();

  const installScriptNames: string[] = readdirSync(_LOCATIONS.installScripts);

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
      scriptRunner(`${_LOCATIONS.installScripts}/${script}`).powershell();
    } else {
      scriptRunner(`${_LOCATIONS.installScripts}/${script}`).bash();
    }
  });
}
