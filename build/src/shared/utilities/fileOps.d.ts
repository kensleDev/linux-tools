import { Dotfile, DotfileProcessing } from '../models';
export declare function getDotFiles(): Dotfile[];
export declare function checkDotFilesExist(dotfiles: Dotfile[]): Promise<DotfileProcessing[] | undefined>;
export declare function missingDotfilesResult(files: any[]): Promise<string>;
