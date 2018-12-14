import { Handler } from './Handler'
import { RequestErrorHandler } from './RequestErrorHandler'
import { RequestSuccessHandler } from './RequestSuccessHandler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { HandlerContext } from './RequestHandler'

export class RequestResponseHandler<T> implements Handler<HandlerContext<T>> {
  private nextHandler: Handler<HandlerContext<T>> = new RequestEmptyHandler()

  private requestErrorHandler: Handler<
    HandlerContext<T>
  > = new RequestErrorHandler<T>()
  private requestSuccessHandler: Handler<
    HandlerContext<T>
  > = new RequestSuccessHandler<T>()

  public async next(context: HandlerContext<T>) {
    this.requestErrorHandler.setNext(new RequestEmptyHandler<T>())
    this.requestSuccessHandler.setNext(new RequestEmptyHandler<T>())

    try {
      context.response.value = await context.request
      this.setNext(this.requestSuccessHandler)
      await this.nextHandler.next(context)
    } catch (e) {
      this.setNext(this.requestErrorHandler)
      await this.nextHandler.next(context)
    } finally {
      context.state.currentState.isLoading = false
    }
  }

  public setNext(handler: Handler<HandlerContext<T>>) {
    this.nextHandler = handler
  }
}
