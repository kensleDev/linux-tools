"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function scriptRunner(scriptLocation) {
    const powershell = () => {
        // tslint:disable-next-line: variable-name
        const PowerShell = require('powershell');
        const ps = new PowerShell(`./${scriptLocation}`);
        // Handle process errors (e.g. powershell not found)
        ps.on('error', (err) => {
            console.error(err);
        });
        // Stdout
        ps.on('output', (data) => {
            console.log(data);
        });
        // Stderr
        ps.on('error-output', (data) => {
            console.error(data);
        });
        // End
        ps.on('end', (code) => {
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
exports.scriptRunner = scriptRunner;
exports.clearScreen = () => process.stdout.write('\u001b[2J\u001b[0;0H');
//# sourceMappingURL=scrtiptRunner.js.map