import { createContext } from 'react'
import { RequestHandler } from '../requestHandlers/RequestHandler'
import { State } from './State'

export interface AppContext {
  requestHandler: RequestHandler
  state: State
}

const state = State.instance

export const contextValue: AppContext = {
  requestHandler: new RequestHandler(state),
  state
}

const Context = createContext<AppContext>(contextValue)

export const Provider = Context.Provider
export const Consumer = Context.Consumer
