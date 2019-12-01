import { Git } from '../models';
import { prompt } from 'inquirer';

export function git(): Git {
  const push = (): void => {
    console.log('push');
  };

  const pull = (): void => {
    console.log('pull');
  };

  const missingDotfiles = async (files: any[]): Promise<string> => {
    console.log('Missing Files');
    console.log('-----------------------------------------');
    console.log(files.join('\n'));
    console.log('');

    const pullFiles = await prompt([
      {
        type: 'confirm',
        message: 'There are missing dotfiles, would you to pull them from git?',
        name: 'pullFiles',
      },
    ]);

    if (pullFiles) {
      // PULL FILES FROM GIT INTO REPO
      git().pull()
      // CP FILES TO CORRECT LOCATIONS
      return ''
    } else {
      console.log(
        'Please add the dotfiles to the correct locations and ensure that dotfiles.json has a correct refernce to that file'
      );

      return 'Please add the dotfiles to the correct locations and ensure that dotfiles.json has a correct refernce to that file';
    }
  }

  return {
    push,
    pull,
    missingDotfiles
  };
}
