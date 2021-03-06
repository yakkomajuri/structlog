// Utils for determining the caller of a function
// Largely inspired in https://github.com/sindresorhus/caller-path

export interface CallSite {
  getThis(): any
  getTypeName(): string
  getFunctionName(): string
  getMethodName(): string
  getFileName(): string
  getLineNumber(): number
  getColumnNumber(): number
  getFunction(): () => any
  getEvalOrigin(): string
  isNative(): boolean
  isToplevel(): boolean
  isEval(): boolean
  isConstructor(): boolean
}

export interface GetCallerResponse {
  filePath: string
  functionName: string
  methodName: string
  typeName: string
  lineNumber: number
}

export class _InternalCaller {
  classNameMarker: string

  constructor(classNameMarker: string) {
    this.classNameMarker = classNameMarker
  }

  callsites(): CallSite[] {
    const _prepareStackTrace = Error.prepareStackTrace
    Error.prepareStackTrace = (_, stack) => stack
    const errorStack: CallSite[] | undefined = new Error().stack as any
    Error.prepareStackTrace = _prepareStackTrace
    const stack = errorStack ? errorStack.slice(1) : []
    return stack
  }

  callerCallsite(depth = 0): CallSite | null {
    const callsites = this.callsites()
    for (let i = 0; i < callsites.length; ++i) {
      const callsite = callsites[i]
      const fileName = callsite.getFileName()
      const typeName = callsite.getTypeName()

      if (fileName && typeName === this.classNameMarker) {
        return callsites[i + depth + 1]
      }
    }

    return null
  }

  getCaller(depth = 0): GetCallerResponse | null {
    try {
      const callsite = this.callerCallsite(depth)
      if (!callsite) {
        return null
      }
      const response = {
        filePath: callsite?.getFileName(),
        functionName: callsite?.getFunctionName(),
        methodName: callsite?.getMethodName(),
        typeName: callsite?.getTypeName(),
        lineNumber: callsite?.getLineNumber(),
      }
      return response
    } catch (_: any) {
      return null
    }
  }
}
