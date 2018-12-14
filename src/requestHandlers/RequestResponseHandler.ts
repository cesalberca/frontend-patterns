import { Handler } from './Handler'
import { State } from '../application/State'
import { RequestErrorHandler } from './RequestErrorHandler'
import { RequestSuccessHandler } from './RequestSuccessHandler'
import { RequestEmptyHandler } from './RequestEmptyHandler'

export class RequestResponseHandler implements Handler<State> {
  private nextHandler: Handler<State> = new RequestEmptyHandler()

  private requestErrorHandler: Handler<State> = new RequestErrorHandler()
  private requestSuccessHandler: Handler<State> = new RequestSuccessHandler()

  public next(state: State) {
    this.requestErrorHandler.setNext(new RequestEmptyHandler())
    this.requestSuccessHandler.setNext(new RequestEmptyHandler())

    const hasError = Math.random() >= 0.5
    if (hasError) {
      this.setNext(this.requestErrorHandler)
      this.nextHandler.next(state)
    } else {
      this.setNext(this.requestSuccessHandler)
      this.nextHandler.next(state)
    }
  }

  public setNext(handler: Handler<State>) {
    this.nextHandler = handler
  }
}
