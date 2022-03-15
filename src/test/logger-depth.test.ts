import { StructuredLogger } from "../index"

const logger = new StructuredLogger({ logFormat: '{path}', pathFormat: '{functionName}', pathStackDepth: 1 })

function log(message: string) {
    logger.log(message)
}

function logTrigger(message: string) {
    log(message)
}

describe('logger-depth', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    test('pathStackDepth behaves correctly', () => {
      logTrigger('log')
      expect(console.log).toHaveBeenCalledWith('logTrigger')
    })
  })
  

