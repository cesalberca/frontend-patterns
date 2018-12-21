import { Handler } from './Handler'
import { RequestHandlerContext } from './RequestHandler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { wait } from '../utils/wait'

export class RequestWarningHandler implements Handler<RequestHandlerContext> {
  private nextHandler: Handler<RequestHandlerContext> = new RequestEmptyHandler()

  public async next(context: RequestHandlerContext) {
    context.stateManager.state.hasWarning = true
    await wait(2.5)

    if (context.stateManager.state.userHasCanceledOperation) {
      this.setNext(new RequestEmptyHandler())
    }

    await this.nextHandler.next(context)
    context.stateManager.state.hasWarning = false
  }

  public setNext(handler: Handler<RequestHandlerContext>) {
    this.nextHandler = handler
  }
}
