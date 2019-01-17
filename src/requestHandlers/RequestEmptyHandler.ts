import { Handler } from './Handler'
import { RequestHandlerContext } from './RequestHandlerContext'

export class RequestEmptyHandler implements Handler<RequestHandlerContext> {
  public async next() {}

  public setNext() {}
}
