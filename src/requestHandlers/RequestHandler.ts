import { Handler } from './Handler'
import { RequestStartHandler } from './RequestStartHandler'
import { RequestEmptyHandler } from './RequestEmptyHandler'
import { State } from '../application/State'
import { RequestResponseHandler } from './RequestResponseHandler'

export class RequestHandler {
  private requestStartHandler: Handler<State> = new RequestStartHandler()

  constructor(private readonly state: State) {
    this.state = state

    const requestResponseHandler = new RequestResponseHandler()
    const requestEmptyHandler = new RequestEmptyHandler()

    this.requestStartHandler.setNext(requestResponseHandler)
    requestResponseHandler.setNext(requestEmptyHandler)
  }

  public async trigger() {
    this.requestStartHandler.next(this.state)
  }
}
