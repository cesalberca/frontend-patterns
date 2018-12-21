import { FakeUser } from '../../fakeUser/FakeUser'

export interface State {
  isLoading: boolean
  hasError: boolean
  hasSuccess: boolean
  hasWarning: boolean
  userHasCanceledOperation: boolean
  users: FakeUser[]
}
