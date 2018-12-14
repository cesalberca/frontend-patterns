import { Repository } from './Repository'
import { FakeUser } from './FakeUserHttpRepository'

export interface FakeUserRepository extends Repository<FakeUser> {}
