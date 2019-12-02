export interface Git {
  push: () => string;
  pull: () => string;
}

export interface ScriptRunner {
  powershell: () => string;
  bash: () => string;
}

export interface FileLocations {
  repoLocation: string
  installScripts: string;
  scripts: string;
}

export interface Installs {
  scriptNames: string[];
}

export type Os = 'windows' | 'linux'


export interface Dotfile {
  name: string
  path: string
}

export interface DotfileProcessing {
  exists: boolean
  path: string
}
