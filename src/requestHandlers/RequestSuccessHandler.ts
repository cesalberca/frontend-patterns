import { Handler } from './Handler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { RequestHandlerContext } from './RequestHandler'

export class RequestSuccessHandler implements Handler<RequestHandlerContext> {
  private nextHandler: Handler<RequestHandlerContext> = new RequestEmptyHandler()

  public async next(context: RequestHandlerContext) {
    context.stateManager.state.hasSuccess = true
    await this.nextHandler.next(context)
  }

  public setNext(handler: Handler<RequestHandlerContext>) {
    this.nextHandler = handler
  }
}
