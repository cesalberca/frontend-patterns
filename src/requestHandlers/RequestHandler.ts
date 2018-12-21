import { RequestStartHandler } from './RequestStartHandler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { StateManager } from '../application/state/StateManager'
import { RequestResponseHandler } from './RequestResponseHandler'
import { Request } from '../Request'
import { RequestWarningHandler } from './RequestWarningHandler'
import { Handler } from './Handler'

export type RequestHandlerContext = {
  stateManager: StateManager
  callback: () => Promise<unknown>
  request: Promise<unknown> | null
  response: Request.Payload<unknown>
}

export class RequestHandler {
  private nextHandler: Handler<RequestHandlerContext> = new RequestEmptyHandler()

  constructor(private readonly state: StateManager) {}

  private setHandlers(hasWarning: boolean): void {
    const requestStartHandler = new RequestStartHandler()
    const requestResponseHandler = new RequestResponseHandler()
    const requestEmptyHandler = new RequestEmptyHandler()

    if (hasWarning) {
      this.nextHandler = new RequestWarningHandler()
      this.nextHandler.setNext(requestStartHandler)
      requestStartHandler.setNext(requestResponseHandler)
      requestResponseHandler.setNext(requestEmptyHandler)
    } else {
      this.nextHandler = new RequestStartHandler()
      this.nextHandler.setNext(requestResponseHandler)
      requestResponseHandler.setNext(requestEmptyHandler)
    }
  }

  public async trigger<T>(
    callback: () => Promise<T>,
    hasWarning: boolean = false
  ): Promise<Request.Success<T> | Request.Fail> {
    const response: Request.Payload<Response> = {
      hasError: false,
      value: null
    }

    this.setHandlers(hasWarning)
    const context = { stateManager: this.state, callback, request: null, response }
    context.stateManager.setEmptyState()
    await this.nextHandler.next(context)

    if (response.hasError) {
      return new Request.Fail()
    }

    return new Request.Success((response.value as unknown) as T)
  }
}
