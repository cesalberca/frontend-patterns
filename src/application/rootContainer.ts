import { createContext } from 'react'
import { RequestHandler } from '../requestHandlers/RequestHandler'
import { State } from '../State'
import { FakeUserRepository } from '../FakeUserRepository'
import { FakeUserHttpRepository, FakeUser } from '../FakeUserHttpRepository'

export interface AppContext {
  fakeUserRequestHandler: RequestHandler<FakeUser[]>
  state: State
  fakeUserRepository: FakeUserRepository
}

const state = State.instance
const fakeUserRequestHandler = new RequestHandler<FakeUser[]>(state)

export const contextValue: AppContext = {
  fakeUserRequestHandler,
  state,
  fakeUserRepository: new FakeUserHttpRepository(fakeUserRequestHandler)
}

const Context = createContext<AppContext>(contextValue)

export const Provider = Context.Provider
export const Consumer = Context.Consumer
