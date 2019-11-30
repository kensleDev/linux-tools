export interface Git {
    push: () => void;
    pull: () => void;
    missingDotfiles: (files: any[]) => Promise<string>;
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
