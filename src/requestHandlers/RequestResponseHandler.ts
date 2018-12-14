import { Handler } from './Handler'
import { RequestErrorHandler } from './RequestErrorHandler'
import { RequestSuccessHandler } from './RequestSuccessHandler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { RequestHandlerContext } from './RequestHandler'

export class RequestResponseHandler<T> implements Handler<RequestHandlerContext<T>> {
  private nextHandler: Handler<RequestHandlerContext<T>> = new RequestEmptyHandler()

  private requestErrorHandler: Handler<RequestHandlerContext<T>> = new RequestErrorHandler<T>()
  private requestSuccessHandler: Handler<RequestHandlerContext<T>> = new RequestSuccessHandler<T>()

  constructor() {
    this.requestErrorHandler.setNext(new RequestEmptyHandler<T>())
    this.requestSuccessHandler.setNext(new RequestEmptyHandler<T>())
  }

  public async next(context: RequestHandlerContext<T>) {
    try {
      context.response.value = await context.request
      this.setNext(this.requestSuccessHandler)
      await this.nextHandler.next(context)
    } catch (e) {
      this.setNext(this.requestErrorHandler)
      await this.nextHandler.next(context)
    } finally {
      context.state.state.isLoading = false
    }
  }

  public setNext(handler: Handler<RequestHandlerContext<T>>) {
    this.nextHandler = handler
  }
}
