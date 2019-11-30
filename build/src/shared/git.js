"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
function git() {
    const push = () => {
        console.log('push');
    };
    const pull = () => {
        console.log('pull');
    };
    const missingDotfiles = async (files) => {
        console.log('Missing Files');
        console.log('-----------------------------------------');
        console.log(files.join('\n'));
        console.log('');
        const pullFiles = await inquirer_1.prompt([
            {
                type: 'confirm',
                message: 'There are missing dotfiles, would you to pull them from git?',
                name: 'pullFiles',
            },
        ]);
        if (pullFiles) {
            // PULL FILES FROM GIT INTO REPO
            // CP FILES TO CORRECT LOCATIONS
            return '';
        }
        else {
            console.log('Please add the dotfiles to the correct locations and ensure that dotfiles.json has a correct refernce to that file');
            return 'Please add the dotfiles to the correct locations and ensure that dotfiles.json has a correct refernce to that file';
        }
    };
    return {
        push,
        pull,
        missingDotfiles
    };
}
exports.git = git;
//# sourceMappingURL=git.js.map