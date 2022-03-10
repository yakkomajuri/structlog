import { UUIDT } from './utils/uuid';
import { GetCallerResponse, _InternalCaller } from './lib/caller'
import { LogOptions, LogTags, LogType, TimestampFormat } from './types/types'
import { colorText, parseTagsAsString } from './utils/utils'
import { threadId, isMainThread } from 'worker_threads'

const timestampConversion: Record<TimestampFormat, string> = {
  [TimestampFormat.Iso]: 'toISOString',
  [TimestampFormat.Utc]: 'toUTCString',
  [TimestampFormat.Gmt]: 'toGMTString',
  [TimestampFormat.TimeString]: 'toTimeString',
  [TimestampFormat.LocaleString]: 'toLocaleString',
  [TimestampFormat.UnixTimestamp]: 'getTime',
}

const DEFAULT_LOG_FORMAT = '{timestamp} [{type}] {message} [{path}] {tags}'


export class StructuredLogger {
  // currently unused, will be used for configuring e.g. timestamp formats in the future
  config: LogOptions
  caller: _InternalCaller

  constructor(options: Partial<LogOptions> = {}) {
    const defaultOptions: LogOptions = {
      timestampFormat: TimestampFormat.Iso,
      logFormat: DEFAULT_LOG_FORMAT,
      pathStackDepth: 0,
      useColors: false,
      useThreadTagsExtension: false,
      useLogIdExtension: false
    }

    this.config = { ...defaultOptions, ...options }
    this.caller = new _InternalCaller(this.constructor.name)
  }

  debug(message: string, tags?: LogTags) {
    const caller = this.caller.getCaller(this.config.pathStackDepth)
    this.#log(LogType.Debug, caller, message, tags)
  }

  info(message: string, tags?: LogTags) {
    const caller = this.caller.getCaller(this.config.pathStackDepth)
    this.#log(LogType.Info, caller, message, tags)
  }

  log(message: string, tags?: LogTags) {
    const caller = this.caller.getCaller(this.config.pathStackDepth)
    this.#log(LogType.Log, caller, message, tags)
  }

  error(message: string, tags?: LogTags) {
    const caller = this.caller.getCaller(this.config.pathStackDepth)
    this.#log(LogType.Error, caller, message, tags)
  }

  warn(message: string, tags?: LogTags) {
    const caller = this.caller.getCaller(this.config.pathStackDepth)
    this.#log(LogType.Warn, caller, message, tags)
  }

  #log(
    type: LogType,
    caller: GetCallerResponse | null,
    message: string,
    tags: LogTags = {}
  ) {
    const tagsString = parseTagsAsString(this.#enrichTags(tags))
    const timestamp = this.#getCurrentTimestampInDesiredFormat()
    const path = caller ? `${caller.fileName}:${caller.lineNumber}` : ''

    let log = this.config.logFormat
    log = log.replace('{timestamp}', timestamp)
    log = log.replace('{message}', message)
    log = log.replace('{type}', type)
    log = log.replace('{path}', path)
    log = log.replace('{tags}', tagsString)

    if (this.config.useColors) {
      log = colorText(type, log)
    }
    console[type](log)
  }

  #getCurrentTimestampInDesiredFormat() {
    const date = new Date()
    return date[timestampConversion[this.config.timestampFormat] ?? 'toIsoString']()
  }

  #enrichTags (tags: LogTags) {
    const enrichmentTags = {}
    if (this.config.useThreadTagsExtension) {
      enrichmentTags['thread'] = isMainThread ? 'MAIN' : threadId
    }

    if (this.config.useLogIdExtension) {
      enrichmentTags['logId'] = new UUIDT().toString()
    }

    return { ...enrichmentTags, ...tags }
  }
}

// for easy use, export a ready instance of StructuredLogger with the default config
export const logger = new StructuredLogger()
