import { Handler } from './Handler'
import { State } from '../application/State'
import { wait } from '../utils/wait'
import { RequestEmptyHandler } from './RequestEmptyHandler'

export class RequestStartHandler implements Handler<State> {
  private nextHandler: Handler<State> = new RequestEmptyHandler()

  public async next(state: State) {
    state.setEmptyState()

    state.currentState.isLoading = true
    await wait(1)

    this.nextHandler.next(state)
    state.currentState.isLoading = false
  }

  public setNext(handler: Handler<State>) {
    this.nextHandler = handler
  }
}
