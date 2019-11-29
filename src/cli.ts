import { prompt } from 'inquirer'
import { readdirSync, readFileSync } from 'fs';
import { Git, FileLocations, ScriptRunner, Installs, Os } from './shared/models';

const isWin = process.platform === 'win32';
const currentPlatform = isWin ? 'windows' : 'linux'
const scriptExt = isWin ? '.ps1' : '.sh'

const clearScreen = () => process.stdout.write('\u001b[2J\u001b[0;0H');

const locations: FileLocations = {
  scripts: `./src/${currentPlatform}/installs/scripts`
}

export async function cli(): Promise<void> {

  clearScreen();

  const menuChoice: { selection: string } = await prompt([
    {
      type: 'list',
      message: 'Main Menu',
      name: 'selection',
      choices: ['Installer', 'Push Dotfiles', 'Pull dotfiles'],
    },
  ]);

  if (menuChoice.selection === 'Installer') {
    // installer()
    const dotFile = findDotFile(currentPlatform, 'Microsoft.PowerShell_profile');

    if (dotFile.length > 0) {
      console.log(dotFile)
    } else {
      console.log(`Can't find Microsoft.PowerShell_profile`)
      // Check custom dotfiles
    }

  } else if (menuChoice.selection === 'Push Dotfiles') {
    git().push();
  } else if (menuChoice.selection === 'Pull Dotfiles') {
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

function scriptRunner(scriptLocation: string): ScriptRunner {
  const powershell = () => {
    // tslint:disable-next-line: variable-name
    const PowerShell = require('powershell');
    const ps = new PowerShell(`./${scriptLocation}`);

    // Handle process errors (e.g. powershell not found)
    ps.on('error', (err: any) => {
      console.error(err);
    });

    // Stdout
    ps.on('output', (data: any) => {
      console.log(data);
    });

    // Stderr
    ps.on('error-output', (data: any) => {
      console.error(data);
    });

    // End
    ps.on('end', (code: any) => {
      // Do Something on end
      //  console.log(code);
    });
  };

  const bash = () => {
    // const exec = require('child_process').exec;
    // var yourscript = exec('sh hi.sh', (error, stdout, stderr) => {
    //   console.log(stdout);
    //   console.log(stderr);
    //   if (error !== null) {
    //     console.log(`exec error: ${error}`);
    //   }
    // });
  };

  return { powershell, bash };
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

function findDotFile(os: Os, dotFileName: string) {

  const locations = () => {

    let common, custom

    if (os === 'windows') {
      common = require('./windows/dotfiles/common_locations.json');
      custom = require('./windows/dotfiles/custom_locations.json');
    } else if (os === 'linux') {
      common = require('./linux/dotfiles/common_locations.json');
      custom = require('./linux/dotfiles/custom_locations.json');
    } else {
      throw new Error('Unknown OS');
    }

    return {
      common, custom
    }
  }

  const commonFilePaths = locations().common[dotFileName];

  if (commonFilePaths !== undefined) {

    const existingFiles: any = []

    commonFilePaths.forEach((path: string) =>  {
      if (checkFileExists(`${path}\\${dotFileName}${scriptExt}`)) {
        existingFiles.push({
          [dotFileName]: path,
        });
      }
    })

    return existingFiles[0]

  }

}


// CHECK PATH FUNC

async function checkFileExists(filePath: string) {
  console.log(filePath)
  try {
    const file = await readFileSync(filePath);
    if (file !== undefined) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    // console.log(e)
  }



}
