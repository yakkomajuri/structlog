import { StructuredLogger } from "../index"
import { TimestampFormat } from "../types/types"

const DEFAULT_DATE =new Date('1970-01-01') 

jest
  .useFakeTimers()
  .setSystemTime(DEFAULT_DATE.getTime())

describe('logger', () => {


  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'debug').mockImplementation(() => {})
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.spyOn(console, 'info').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  // path is tested in logger-path.test.ts
  const defaultLogger = new StructuredLogger({ pathFormat: '<path>' })

  test('logger.log', () => {
    defaultLogger.log('foo')
    expect(console.log).toHaveBeenCalledWith('1970-01-01T00:00:00.000Z [log] foo [<path>] ')
  })

  test('logger.debug', () => {
    defaultLogger.debug('foo')
    expect(console.debug).toHaveBeenCalledWith('1970-01-01T00:00:00.000Z [debug] foo [<path>] ')
  })

  test('logger.warn', () => {
    defaultLogger.warn('foo')
    expect(console.warn).toHaveBeenCalledWith('1970-01-01T00:00:00.000Z [warn] foo [<path>] ')
  })

  test('logger.error', () => {
    defaultLogger.error('foo')
    expect(console.error).toHaveBeenCalledWith('1970-01-01T00:00:00.000Z [error] foo [<path>] ')
  })

  test('logger.info', () => {
    defaultLogger.info('foo')
    expect(console.info).toHaveBeenCalledWith('1970-01-01T00:00:00.000Z [info] foo [<path>] ')
  })

  test('logFormat', () => {
    let logger = new StructuredLogger({ logFormat: '{message} {timestamp} --{path}--', pathFormat: '<path>' })
    logger.log('foo')
    expect(console.log).toHaveBeenCalledWith('foo 1970-01-01T00:00:00.000Z --<path>--')

    logger = new StructuredLogger({ logFormat: '{tags}{message}' })
    logger.info('foo', { 'a': '1' })
    expect(console.info).toHaveBeenCalledWith('a=1 foo')
  })

  test('threadId extension', () => {
    let logger = new StructuredLogger({ useThreadTagsExtension: true, pathFormat: '<path>' })
    logger.log('foo')
    expect(console.log).toHaveBeenCalledWith('1970-01-01T00:00:00.000Z [log] foo [<path>] thread=MAIN ')
  })

  test('logId extension', () => {
    jest.spyOn(StructuredLogger, 'generateUuid').mockImplementationOnce(() => 'some_log_id')
    let logger = new StructuredLogger({ useLogIdExtension: true, pathFormat: '<path>' })
    logger.log('foo')
    expect(console.log).toHaveBeenCalledWith('1970-01-01T00:00:00.000Z [log] foo [<path>] logId=some_log_id ')
  })

  test('colors extension', () => {
    let logger = new StructuredLogger({ useColors: true, logFormat: '{message}' })
    logger.log('foo')
    logger.debug('foo')
    logger.info('foo')
    logger.error('foo')
    logger.warn('foo')

    expect(console.log).toHaveBeenCalledWith('foo')
    expect(console.debug).toHaveBeenCalledWith('\x1b[90mfoo\x1b[0m')
    expect(console.info).toHaveBeenCalledWith('\x1b[36mfoo\x1b[0m')
    expect(console.error).toHaveBeenCalledWith('\x1b[31mfoo\x1b[0m')
    expect(console.warn).toHaveBeenCalledWith('\x1b[33mfoo\x1b[0m')

  })

  test('unix timestamp', () => {
    let logger = new StructuredLogger({ timestampFormat: TimestampFormat.UnixTimestamp, logFormat: '{timestamp}' })
    logger.log('foo')

    expect(console.log).toHaveBeenCalledWith(String(DEFAULT_DATE.getTime()))
  })

  test('utc timestamp', () => {
    let logger = new StructuredLogger({ timestampFormat: TimestampFormat.Utc, logFormat: '{timestamp}' })
    logger.log('foo')

    expect(console.log).toHaveBeenCalledWith(String(DEFAULT_DATE.toUTCString()))
  })

  test('timestring timestamp', () => {
    let logger = new StructuredLogger({ timestampFormat: TimestampFormat.TimeString, logFormat: '{timestamp}' })
    logger.log('foo')

    expect(console.log).toHaveBeenCalledWith(String(DEFAULT_DATE.toTimeString()))
  })

  test('timestring timestamp', () => {
    let logger = new StructuredLogger({ timestampFormat: TimestampFormat.LocaleString, logFormat: '{timestamp}' })
    logger.log('foo')

    expect(console.log).toHaveBeenCalledWith(String(DEFAULT_DATE.toLocaleString()))
  })
})


