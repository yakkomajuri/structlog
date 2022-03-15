import { logger } from "../index"

jest
  .useFakeTimers()
  .setSystemTime(new Date('1970-01-01').getTime())

// Nothing else should be added to this file!
describe('logger-path', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    test('path is correct', () => {
      logger.log('log')
      expect(console.log).toHaveBeenCalledWith(`1970-01-01T00:00:00.000Z [log] log [${__filename}:10] `)
    })
  })
  