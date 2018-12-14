import { Handler } from './Handler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { HandlerContext } from './RequestHandler'

export class RequestStartHandler<T> implements Handler<HandlerContext<T>> {
  private nextHandler: Handler<HandlerContext<T>> = new RequestEmptyHandler()

  public async next(context: HandlerContext<T>) {
    context.state.setEmptyState()
    context.state.currentState.isLoading = true
    await this.nextHandler.next(context)
  }

  public setNext(handler: Handler<HandlerContext<T>>) {
    this.nextHandler = handler
  }
}
