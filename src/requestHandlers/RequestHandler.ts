import { RequestStartHandler } from './RequestStartHandler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { StateManager } from '../application/state/StateManager'
import { RequestResponseHandler } from './RequestResponseHandler'
import { Request } from '../Request'
import { RequestWarningHandler } from './RequestWarningHandler'
import { Handler } from './Handler'
import { RequestHandlerContext } from './RequestHandlerContext'

export class RequestHandler {
  private nextHandler: Handler<RequestHandlerContext> = new RequestEmptyHandler()

  constructor(private readonly state: StateManager) {}

  public async trigger<T>(
    callback: () => Promise<T>,
    hasWarning: boolean = false
  ): Promise<Request.Success<T> | Request.Fail> {
    const response: Request.Payload<Response> = {
      hasError: false,
      value: null
    }

    this.nextHandler = this.getNextHandler(hasWarning)
    const context: RequestHandlerContext = {
      stateManager: this.state,
      callback,
      request: null,
      response
    }

    context.stateManager.setEmptyState()
    await this.nextHandler.next(context)

    if (response.hasError) {
      return new Request.Fail()
    }

    return new Request.Success((response.value as unknown) as T)
  }

  private getNextHandler(hasWarning: boolean): Handler<RequestHandlerContext> {
    if (hasWarning) {
      return this.getWarningHandlers()
    }

    return this.getDefaultHandlers()
  }

  private getWarningHandlers(): Handler<RequestHandlerContext> {
    const requestStartHandler = new RequestStartHandler()
    const requestResponseHandler = new RequestResponseHandler()
    const requestEmptyHandler = new RequestEmptyHandler()

    const handler = new RequestWarningHandler()
    handler.setNext(requestStartHandler)
    requestStartHandler.setNext(requestResponseHandler)
    requestResponseHandler.setNext(requestEmptyHandler)

    return handler
  }

  private getDefaultHandlers(): Handler<RequestHandlerContext> {
    const requestResponseHandler = new RequestResponseHandler()
    const requestEmptyHandler = new RequestEmptyHandler()

    const handler = new RequestStartHandler()
    handler.setNext(requestResponseHandler)
    requestResponseHandler.setNext(requestEmptyHandler)
    return handler
  }
}
