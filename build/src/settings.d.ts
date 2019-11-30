import { FileLocations } from './shared/models';
export declare const _IS_WIN: boolean;
export declare const _CURRENT_PLATFORM: string;
export declare const _DEBUG = false;
export declare const _OPTIONS: any;
export declare const _DOTFILES: any;
export declare const locations: FileLocations;
export declare function initSettings(debug: boolean): Promise<void>;
export declare function checkDotFiles(debug: boolean): Promise<void>;
