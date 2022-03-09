export enum LogType {
  Debug = 'debug',
  Info = 'info',
  Log = 'log',
  Warn = 'warn',
  Error = 'error',
}

export enum TimestampFormat {
  Iso = 'iso',
  Utc = 'utc',
  Gmt = 'gmt',
  TimeString = 'timestring',
  LocaleString = 'localestring',
  UnixTimestamp = 'unix',
}

export interface LogOptions extends Record<string, any> {
  timestampFormat: TimestampFormat,
  logFormat: string,
  useColors: boolean,
  useThreadTagsExtension: boolean
}

export type LogTags = Record<string, string>
