import { Git } from '../models';
import { scriptRunner } from '../../scriptRunner/scrtiptRunner';
import { _LOCATIONS, _IS_WIN } from '../../settings';

export function git(repoPath: string): Git {

  const platformRunner = _IS_WIN ? 'powershell' : 'bash';


  const push = (): string => {
    const scriptOutput = scriptRunner(
      `${_LOCATIONS.scripts}/git.push.ps1 ${repoPath}`
    );
    return scriptOutput[platformRunner]();
  };

  const pull = (): string => {
    const scriptOutput = scriptRunner(
      `${_LOCATIONS.scripts}/git.pull.ps1 ${repoPath}`
    );
    return scriptOutput[platformRunner]();
  };

  const getGist = () => {

  }

  return {
    push,
    pull
  };
}
