import { Handler } from './Handler'
import { RequestHandlerContext } from './RequestHandlerContext'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { waitUntilOr } from '../utils/wait'

export class RequestWarningHandler implements Handler<RequestHandlerContext> {
  private nextHandler: Handler<RequestHandlerContext> = new RequestEmptyHandler()

  public async next(context: RequestHandlerContext) {
    context.stateManager.state.hasWarning = true

    await waitUntilOr(2.5, () => context.stateManager.state.userHasCanceledOperation)

    if (context.stateManager.state.userHasCanceledOperation) {
      this.setNext(new RequestEmptyHandler())
    }

    context.stateManager.state.hasWarning = false
    await this.nextHandler.next(context)
  }

  public setNext(handler: Handler<RequestHandlerContext>) {
    this.nextHandler = handler
  }
}
