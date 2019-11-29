export interface Git {
  push: () => void;
  pull: () => void;
}

export interface ScriptRunner {
  powershell: () => void;
  bash: () => void;
}

export interface FileLocations {
  scripts: string;
}

export interface Installs {
  scriptNames: string[];
}

export type Os = 'windows' | 'linux'
