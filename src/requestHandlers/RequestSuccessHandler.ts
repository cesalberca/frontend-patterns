import { Handler } from './Handler'
import { State } from '../application/State'
import { RequestEmptyHandler } from './RequestEmptyHandler'

export class RequestSuccessHandler implements Handler<State> {
  private nextHandler: Handler<State> = new RequestEmptyHandler()

  public next(state: State) {
    state.currentState.hasSuccess = true
    this.nextHandler.next(state)
  }

  public setNext(handler: Handler<State>) {
    this.nextHandler = handler
  }
}
