// import { getDotfileLocations } from './fileOps'
import { _OPTIONS } from '../../settings';
import { Dotfile } from '../models';
import { checkDotFilesExist } from './fileOps';


const dotfiles: Dotfile[] = require(_OPTIONS.dotfilesFilePath)
const missingDotfiles = [ { name: "madeup", path: "nowhere" } ]

const firstDotfileValue: string = Object.values(dotfiles)[0].path[0]
console.log(dotfiles);

// test('returns string[] of locations when given dotfiles JSON', () => {
//   expect(getDotfileLocations(dotfiles)).toBeDefined()
//   expect(getDotfileLocations(dotfiles)).toBeInstanceOf(Array);
//   expect(getDotfileLocations(dotfiles).length).toBeGreaterThan(0)
//   // expect(getDotfileLocations(dotfiles)[0]).toBeInstanceOf(Array);
//   expect(getDotfileLocations(dotfiles)[0]).toMatch(firstDotfileValue);

// });

test('checkDotFilesExist - P1 - returns empty array for success', () => {
  expect(checkDotFilesExist(dotfiles)).toBeDefined();
  expect(checkDotFilesExist(dotfiles)).resolves.toBeInstanceOf(Array);
});

test('checkDotFilesExist - P2 - returns array of missing files for failure', () => {
  expect(checkDotFilesExist(missingDotfiles)).toBeDefined();
  expect(checkDotFilesExist(missingDotfiles)).resolves.toBeInstanceOf(Array);
});
