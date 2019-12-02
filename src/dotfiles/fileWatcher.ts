import * as chokidar from 'chokidar';
import { copyFile } from 'fs';
import { _CURRENT_PLATFORM, _DOTFILES, _OPTIONS } from '../settings';
import { Logger } from '../shared/logger';


export function fileWatcher() {

  const filePaths: string[] = Object.values(_DOTFILES)
  const repoDotfileLocation = (dotfileName: string) =>
    `${_OPTIONS.repoLocation}\\src\\assets\\${_CURRENT_PLATFORM}\\dotfiles\\${dotfileName}`;

  const watcher = chokidar.watch(filePaths, { persistent: true });

  watcher.on('change', (path, event) => {
    const currentDotfileName = path.substring(path.lastIndexOf('\\')+1)

    copyFile(path, repoDotfileLocation(currentDotfileName), (err) => {
      if (err) Logger.err(err.toString())
    });

  });

}
