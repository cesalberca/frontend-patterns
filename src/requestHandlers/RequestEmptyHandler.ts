import { Handler } from './Handler'
import { State } from '../application/State'

export class RequestEmptyHandler implements Handler<State> {
  public next() {}

  public setNext() {}
}
