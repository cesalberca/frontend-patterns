import { StateManager } from '../application/state/StateManager'
import { Request } from '../Request'

export interface RequestHandlerContext {
  stateManager: StateManager
  callback: () => Promise<unknown>
  request: Promise<unknown> | null
  response: Request.Payload<unknown>
}
