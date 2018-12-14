import { Handler } from './Handler'
import { RequestStartHandler } from './RequestStartHandler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { StateManager } from '../application/state/StateManager'
import { RequestResponseHandler } from './RequestResponseHandler'
import { Request } from '../Request'

export type RequestHandlerContext<T> = {
  state: StateManager
  request: Promise<T>
  response: Request.Payload<T>
}

export class RequestHandler<T> {
  private requestStartHandler: Handler<RequestHandlerContext<T>> = new RequestStartHandler()

  constructor(private readonly state: StateManager) {
    const requestResponseHandler: Handler<RequestHandlerContext<T>> = new RequestResponseHandler<T>()
    const requestEmptyHandler: Handler<RequestHandlerContext<T>> = new RequestEmptyHandler<T>()

    this.requestStartHandler.setNext(requestResponseHandler)
    requestResponseHandler.setNext(requestEmptyHandler)
  }

  public async trigger(request: Promise<T>): Promise<Request.Success<T> | Request.Fail> {
    const response: Request.Payload<T> = {
      hasError: false,
      value: null
    }

    await this.requestStartHandler.next({ state: this.state, request, response })

    if (response.hasError) {
      return new Request.Fail()
    }
    return new Request.Success(response.value as T)
  }
}
