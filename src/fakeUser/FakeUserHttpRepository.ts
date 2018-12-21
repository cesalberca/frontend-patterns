import { FakeUserRepository } from './FakeUserRepository'
import { RequestHandler } from '../requestHandlers/RequestHandler'
import { Request } from '../Request'
import { wait } from '../utils/wait'
import { FakeUser } from './FakeUser'

export class FakeUserHttpRepository implements FakeUserRepository {
  private fakeUsers: FakeUser[] = [{ name: 'César' }, { name: 'Paco' }, { name: 'Alejandro' }]

  constructor(private readonly requestHandler: RequestHandler) {}

  public async findAll(): Promise<FakeUser[]> {
    const promise = () => this.getFakeUsers()

    const response = await this.requestHandler.trigger<FakeUser[]>(promise)

    if (response instanceof Request.Fail) {
      throw new Error('users could not be found.')
    }

    return response.value
  }

  public async deleteAll() {
    const promise: () => Promise<void> = () =>
      new Promise(async resolve => {
        await wait(1)
        this.fakeUsers = []
        resolve()
      })

    await this.requestHandler.trigger<void>(promise, true)
  }

  private async getFakeUsers(): Promise<FakeUser[]> {
    await wait(1)
    const hasError = Math.random() >= 20

    if (hasError) {
      throw new Error()
    }

    return this.fakeUsers
  }
}
