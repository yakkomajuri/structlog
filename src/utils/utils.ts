import { LogType } from './../types/types';
import  colors from 'colors/safe'

export function parseTagsAsString(tags: Record<string, string>) {
  let result = ''
  for (const [key, val] of Object.entries(tags)) {
    result += `${key}=${val} `
  }
  return result
}

export function colorText (logType: LogType, message: string): string {
  if (logType === LogType.Error) {
    return colors.red(message)
  } else if (logType === LogType.Warn) {
    return colors.yellow(message)
  } else if (logType === LogType.Info) {
    return colors.blue(message)
  } else if (logType === LogType.Debug) {
    return colors.gray(message)
  } 

  return message
}