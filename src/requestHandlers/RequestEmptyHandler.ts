import { Handler } from './Handler'
import { RequestHandlerContext } from './RequestHandler'

export class RequestEmptyHandler<T> implements Handler<RequestHandlerContext<T>> {
  public async next() {}

  public setNext() {}
}
