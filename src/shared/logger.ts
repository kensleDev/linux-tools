import { writeFileSync, appendFileSync } from 'fs'
import { _LOCATIONS, _DEBUG } from '../settings'

const chalk = require('chalk')

export type LogType = 'info' | 'warn' | 'err' | 'log'

export class Logger {

  static history: string[] = []

  static addToHistory(input: string) {
    this.history.push(input)
    appendFileSync(_LOCATIONS.logLocation, input);
  }

  static assembleLog(text: string, type: LogType): string {

    let color = ''

    if (type === 'info') color = 'blue';
    if (type === 'warn') color = 'yellow';
    if (type === 'err') color = 'red';
    if (type === 'log') color = 'green';

    const badge = (input: string) => `|-${input}-| `;

    const format = chalk[color](badge(type.toUpperCase())) + text;

    return format
  }

  static info(text: string) {
    const data = this.assembleLog(text, 'info');
    this.addToHistory(data);
    if (_DEBUG) console.log(data)
  }

  static warn(text: string) {
    const data = this.assembleLog(text, 'warn');
    this.addToHistory(data);
    if (_DEBUG) console.log(data);
  }

  static err(text: string) {
    const data = this.assembleLog(text, 'err');
    this.addToHistory(data);
    if (_DEBUG) console.log(data);
  }

  static log(text: string) {
    const data = this.assembleLog(text, 'info');
    this.addToHistory(data);
    if (_DEBUG) console.log(data);
  }


}
