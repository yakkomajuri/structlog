// Utils for determining the caller of a function
// Largely inspired in https://github.com/sindresorhus/caller-path

export interface CallSite {
  getThis(): any;
  getTypeName(): string;
  getFunctionName(): string;
  getMethodName(): string;
  getFileName(): string;
  getLineNumber(): number;
  getColumnNumber(): number;
  getFunction(): () => any;
  getEvalOrigin(): string;
  isNative(): boolean;
  isToplevel(): boolean;
  isEval(): boolean;
  isConstructor(): boolean;
}

export interface GetCallerResponse {
  fileName: string;
  functionName: string;
  methodName: string;
  typeName: string;
  lineNumber: number;
}

export class _InternalCaller {
  classNameMarker: string;

  constructor(classNameMarker: string) {
    this.classNameMarker = classNameMarker;
  }

  callsites(): CallSite[] {
    const _prepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const errorStack: CallSite[] | undefined = new Error().stack as any;
    Error.prepareStackTrace = _prepareStackTrace;
    const stack = errorStack ? errorStack.slice(1) : [];
    return stack;
  }

  callerCallsite(): CallSite | null {
    let targetFound = false;
    for (const callsite of this.callsites() || []) {
      if (targetFound) {
        return callsite;
      }

      const fileName = callsite.getFileName();
      const typeName = callsite.getTypeName();

      if (fileName && typeName === this.classNameMarker) {
        targetFound = true;
        continue;
      }
    }

    return null;
  }

  getCaller(): GetCallerResponse | null {
    const callsite = this.callerCallsite();
    if (!callsite) {
      return null;
    }
    const response = {
      fileName: callsite?.getFileName(),
      functionName: callsite?.getFunctionName(),
      methodName: callsite?.getMethodName(),
      typeName: callsite?.getTypeName(),
      lineNumber: callsite?.getLineNumber(),
    };
    return response;
  }
}
