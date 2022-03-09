import { GetCallerResponse, _InternalCaller } from './lib/caller';
import { LogOptions, LogTags, LogType } from './types/types';
import { parseTagsAsString } from './utils/utils';

export class StructuredLogger {
  // currently unused, will be used for configuring e.g. timestamp formats in the future
  config: LogOptions;
  caller: _InternalCaller;

  constructor(options?: LogOptions) {
    this.config = options;
    this.caller = new _InternalCaller(this.constructor.name);
  }

  debug(message: string, tags?: LogTags) {
    const caller = this.caller.getCaller();
    this.#log(LogType.Debug, caller, message, tags);
  }

  info(message: string, tags?: LogTags) {
    const caller = this.caller.getCaller();
    this.#log(LogType.Info, caller, message, tags);
  }

  log(message: string, tags?: LogTags) {
    const caller = this.caller.getCaller();
    this.#log(LogType.Log, caller, message, tags);
  }

  error(message: string, tags?: LogTags) {
    const caller = this.caller.getCaller();
    this.#log(LogType.Error, caller, message, tags);
  }

  warn(message: string, tags?: LogTags) {
    const caller = this.caller.getCaller();
    this.#log(LogType.Warn, caller, message, tags);
  }

  #log(
    type: LogType,
    caller: GetCallerResponse,
    message: string,
    tags: LogTags = {}
  ) {
    const tagsString = parseTagsAsString(tags);
    const isoTimestamp = new Date().toISOString();
    const path = `${caller.fileName}:${caller.lineNumber}`;
    const log = `${isoTimestamp} [${type}] ${message} [${path}] ${tagsString}`;
    console[type](log);
  }
}

// for easy use, export a ready instance of StructuredLogger with the default config
export const logger = new StructuredLogger();
