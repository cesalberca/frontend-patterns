export namespace Request {
  export class Success<T> {
    constructor(public readonly value: T) {}
  }

  export class Fail extends Error {
    constructor() {
      super('Request failed')

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Error)
      }
    }
  }

  export type Payload<T> = { hasError: boolean; value: null | T }
}
