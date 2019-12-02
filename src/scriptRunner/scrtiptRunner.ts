import { ScriptRunner } from '../shared/models';

export function scriptRunner(scriptLocation: string): ScriptRunner {
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
      return data
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

    return ""
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
    return ""
  };

  return { powershell, bash };
}

export const clearScreen = () => process.stdout.write('\u001b[2J\u001b[0;0H');
