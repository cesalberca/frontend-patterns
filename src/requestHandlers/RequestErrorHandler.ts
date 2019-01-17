import { Handler } from './Handler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { RequestHandlerContext } from './RequestHandlerContext'

export class RequestErrorHandler implements Handler<RequestHandlerContext> {
  private nextHandler: Handler<RequestHandlerContext> = new RequestEmptyHandler()

  public async next(context: RequestHandlerContext) {
    context.stateManager.state.hasError = true
    context.response.hasError = true
    await this.nextHandler.next(context)
  }

  public setNext(handler: Handler<RequestHandlerContext>) {
    this.nextHandler = handler
  }
}
