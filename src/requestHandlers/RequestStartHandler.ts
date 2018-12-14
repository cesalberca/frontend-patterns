import { Handler } from './Handler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { RequestHandlerContext } from './RequestHandler'

export class RequestStartHandler<T> implements Handler<RequestHandlerContext<T>> {
  private nextHandler: Handler<RequestHandlerContext<T>> = new RequestEmptyHandler()

  public async next(context: RequestHandlerContext<T>) {
    context.state.setEmptyState()
    context.state.state.isLoading = true
    await this.nextHandler.next(context)
  }

  public setNext(handler: Handler<RequestHandlerContext<T>>) {
    this.nextHandler = handler
  }
}
