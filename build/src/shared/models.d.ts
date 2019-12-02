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
export declare type Os = 'windows' | 'linux';
export interface Dotfile {
    name: string;
    path: string;
}
export interface DotfileProcessing {
    exists: boolean;
    path: string;
}
