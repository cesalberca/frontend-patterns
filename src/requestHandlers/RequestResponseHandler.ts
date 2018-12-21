import { Handler } from './Handler'
import { RequestErrorHandler } from './RequestErrorHandler'
import { RequestSuccessHandler } from './RequestSuccessHandler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { RequestHandlerContext } from './RequestHandler'

export class RequestResponseHandler implements Handler<RequestHandlerContext> {
  private nextHandler: Handler<RequestHandlerContext> = new RequestEmptyHandler()

  private requestErrorHandler = new RequestErrorHandler()
  private requestSuccessHandler = new RequestSuccessHandler()

  constructor() {
    this.requestErrorHandler.setNext(new RequestEmptyHandler())
    this.requestSuccessHandler.setNext(new RequestEmptyHandler())
  }

  public async next(context: RequestHandlerContext) {
    try {
      context.response.value = await context.request
      this.setNext(this.requestSuccessHandler)
      await this.nextHandler.next(context)
    } catch (e) {
      this.setNext(this.requestErrorHandler)
      await this.nextHandler.next(context)
    } finally {
      context.stateManager.state.isLoading = false
    }
  }

  public setNext(handler: Handler<RequestHandlerContext>) {
    this.nextHandler = handler
  }
}
