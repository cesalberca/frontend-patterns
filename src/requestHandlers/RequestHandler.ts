import { Handler } from './Handler'
import { RequestStartHandler } from './RequestStartHandler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { State } from '../State'
import { RequestResponseHandler } from './RequestResponseHandler'

type Response<T> = { hasError: boolean; value: null | T }

export type HandlerContext<T> = {
  state: State
  request: Promise<T>
  response: Response<T>
}

export class ResponseSuccess<T> {
  constructor(public readonly value: T) {}
}

export class ResponseError extends Error {
}

export class RequestHandler<T = unknown> {
  private requestStartHandler: Handler<
    HandlerContext<T>
  > = new RequestStartHandler()

  constructor(private readonly state: State) {
    const requestResponseHandler: Handler<
      HandlerContext<T>
    > = new RequestResponseHandler<T>()
    const requestEmptyHandler: Handler<
      HandlerContext<T>
    > = new RequestEmptyHandler<T>()

    this.requestStartHandler.setNext(requestResponseHandler)
    requestResponseHandler.setNext(requestEmptyHandler)
  }

  public async trigger(
    request: Promise<T>
  ): Promise<ResponseSuccess<T> | ResponseError> {
    const response: Response<T> = {
      hasError: false,
      value: null
    }

    await this.requestStartHandler.next({ state: this.state, request, response })

    if (response.hasError) {
      return new ResponseError()
    }
    return new ResponseSuccess(response.value as T)
  }
}
