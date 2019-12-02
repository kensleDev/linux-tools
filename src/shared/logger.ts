import { writeFileSync, appendFileSync } from 'fs'
import { _LOCATIONS, _DEBUG } from '../settings'

const chalk = require('chalk')

export type LogType = 'info' | 'warn' | 'err' | 'log'

export class Logger {

  static history: string[] = []

  static addToHistory(input: string) {
    this.history.push(input)
    appendFileSync(_LOCATIONS.logLocation, input + '\n');
  }

  static assembleLog(text: string, type: LogType) {

    const dt = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
    });

    let color = ''

    if (type === 'info') color = 'blue';
    if (type === 'warn') color = 'yellow';
    if (type === 'err') color = 'red';
    if (type === 'log') color = 'green';

    const badge = (input: string) => `|-${input}-| `;

    const colored = chalk[color](badge(type.toUpperCase())) + text;
    const plain = badge(type.toUpperCase() + '-|- ' + dt + ' ') + text;

    return { colored, plain };
  }

  static title(text: string) {
    this.info(`-----------------------`);
    this.info(`${text}`);
    this.info(`-----------------------`);
  }

  static info(text: string) {
    const data = this.assembleLog(text, 'info');
    this.addToHistory(data.plain);
    if (_DEBUG) console.log(data.colored);
  }

  static warn(text: string) {
    const data = this.assembleLog(text, 'warn');
    this.addToHistory(data.plain);
    if (_DEBUG) console.log(data.colored);
  }

  static err(text: string) {
    const data = this.assembleLog(text, 'err');
    this.addToHistory(data.plain);
    if (_DEBUG) console.log(data.colored);
  }

  static log(text: string) {
    const data = this.assembleLog(text, 'info');
    this.addToHistory(data.plain);
    if (_DEBUG) console.log(data.colored);
  }

}
