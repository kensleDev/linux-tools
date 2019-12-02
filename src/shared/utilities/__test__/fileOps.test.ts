// import { getDotfileLocations } from './fileOps'
import { _DOTFILES } from '../../../settings';
import { Dotfile } from '../../models';
import { checkDotFilesExist, missingDotfilesResult } from '../fileOps';


const dotfiles: Dotfile[] = _DOTFILES;
const missingDotfiles = [ { name: "madeup", path: "nowhere" } ]

const missingDotfilesProcessing = [{ exists: false, path: 'nowhere' }];


// const firstDotfileValue: string = Object.values(dotfiles)[0].path[0]
// console.log(dotfiles);

describe('checkDotFilesExist', () => {
  test('P1 - returns empty array for success', async () => {
    const files = await checkDotFilesExist(dotfiles);
    expect(files).toBeDefined();
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(0);
  });

  test('P2 - returns array of missing files for failure', async () => {
    const missingFiles = await checkDotFilesExist(missingDotfiles);
    expect(missingFiles).toBeDefined();
    expect(missingFiles).toBeInstanceOf(Array);
    expect(missingFiles.length).toBeGreaterThan(0);
  });
})

// describe('missingDotfilesResult', () => {
//   test('P1 - pulling new files', async () => {
//     const missingResult = await missingDotfilesResult(missingDotfilesProcessing)
//     expect(missingResult).toBeDefined();
//     expect(missingResult).toBeInstanceOf(String);
//     expect(missingResult.substring(0, 5)).toBe("Pulled");
//   }, 1000);

// });

