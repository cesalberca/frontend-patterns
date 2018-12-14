import { FakeUser } from '../../fakeUser/FakeUser'

export interface State {
  isLoading: boolean
  hasError: boolean
  hasSuccess: boolean
  users: FakeUser[]
}
