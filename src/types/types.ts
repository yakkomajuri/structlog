export enum LogType {
  Debug = 'debug',
  Info = 'info',
  Log = 'log',
  Warn = 'warn',
  Error = 'error',
}

export interface LogOptions extends Record<string, any> {}

export type LogTags = Record<string, string>;
