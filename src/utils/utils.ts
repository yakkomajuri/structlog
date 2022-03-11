import { LogType } from './../types/types';

export function parseTagsAsString(tags: Record<string, string>) {
  let result = ''
  for (const [key, val] of Object.entries(tags)) {
    result += `${key}=${val} `
  }
  return result
}

export function colorText (logType: LogType, message: string): string {
  if (logType === LogType.Error) {
    return `\x1b[31m${message}\x1b[0m`
  } else if (logType === LogType.Warn) {
    return `\x1b[33m${message}\x1b[0m`
  } else if (logType === LogType.Info) {
    return `\x1b[36m${message}\x1b[0m`
  } else if (logType === LogType.Debug) {
    return `\x1b[90m${message}\x1b[0m`
  } 

  return message
}