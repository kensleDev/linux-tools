import { _DOTFILES, _OPTIONS, _CURRENT_PLATFORM } from '../settings';
import { Dotfile } from '../shared/models';
import { copyDotfilesToRepo } from '../shared/utilities/fileOps';
import { git } from '../shared/utilities/git';

export async function uploadDotfiles() {
  // Copy dotfiles from local system to repo
  const dotfiles = _DOTFILES
  const repoLocation = _OPTIONS.repoLocation
  const currentPlatform = _CURRENT_PLATFORM

  copyDotfilesToRepo(dotfiles, repoLocation, currentPlatform);

  // Push to git
  git(repoLocation).push();
}

export async function downloadDotfiles() {}
