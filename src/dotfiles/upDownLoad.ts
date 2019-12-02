import { _DOTFILES, _OPTIONS, _CURRENT_PLATFORM } from '../settings';
import { copyDotfiles} from '../shared/utilities/fileOps';
import { git } from '../shared/utilities/git';


const dotfiles = _DOTFILES;
const repoLocation = _OPTIONS.repoLocation;
const currentPlatform = _CURRENT_PLATFORM;

export async function uploadDotfiles() {
  // Copy dotfiles from local system to repo
  copyDotfiles('push', dotfiles, repoLocation, currentPlatform);
  // Push to git
  git(repoLocation).push();
}

export async function downloadDotfiles() {
  git(repoLocation).pull();

  copyDotfiles('pull', dotfiles, repoLocation, currentPlatform);
}
