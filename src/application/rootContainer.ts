import { createContext } from 'react'
import { RequestHandler } from '../requestHandlers/RequestHandler'
import { StateManager } from './state/StateManager'
import { FakeUserRepository } from '../fakeUser/FakeUserRepository'
import { FakeUserHttpRepository} from '../fakeUser/FakeUserHttpRepository'
import { FakeUser } from '../fakeUser/FakeUser'

export interface AppContext {
  fakeUserRepository: FakeUserRepository
}

const state = StateManager.instance
const fakeUserRequestHandler = new RequestHandler<FakeUser[]>(state)

export const contextValue: AppContext = {
  fakeUserRepository: new FakeUserHttpRepository(fakeUserRequestHandler)
}

const Context = createContext<AppContext>(contextValue)

export const Provider = Context.Provider
export const Consumer = Context.Consumer
