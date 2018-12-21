import { Handler } from './Handler'
import { RequestHandlerContext } from './RequestHandler'

export class RequestEmptyHandler implements Handler<RequestHandlerContext> {
  public async next() {}

  public setNext() {}
}
