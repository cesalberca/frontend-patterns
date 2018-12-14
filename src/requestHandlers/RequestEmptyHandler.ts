import { Handler } from './Handler'
import { HandlerContext } from './RequestHandler'

export class RequestEmptyHandler<T> implements Handler<HandlerContext<T>> {
  public async next() {}

  public setNext() {}
}
