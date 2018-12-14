import { RequestErrorHandler } from '../RequestErrorHandler'
import { StateMother } from '../../application/__mocks__/StateMother'

describe('RequestErrorHandler', () => {

  let handler: RequestErrorHandler

  beforeEach(() => {
    const stateMother = new StateMother()
    handler = new RequestErrorHandler(stateMother.getState())
  })

  it('should set error', () => {

  })
})
