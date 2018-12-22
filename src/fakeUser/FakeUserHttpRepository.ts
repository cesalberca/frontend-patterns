import { FakeUserRepository } from './FakeUserRepository'
import { RequestHandler } from '../requestHandlers/RequestHandler'
import { Request } from '../Request'
import { wait } from '../utils/wait'
import { FakeUser } from './FakeUser'

export class FakeUserHttpRepository implements FakeUserRepository {
  private fakeUsers: FakeUser[] = [{ name: 'César' }, { name: 'Paco' }, { name: 'Alejandro' }]

  constructor(private readonly requestHandler: RequestHandler) {}

  public async findAll(): Promise<FakeUser[]> {
    const callback = () => this.getFakeUsers()

    const response = await this.requestHandler.trigger<FakeUser[]>(callback)

    if (response instanceof Request.Fail) {
      throw new Error('users could not be found.')
    }

    return response.value
  }

  public async deleteAll() {
    const callback: () => Promise<void> = () =>
      new Promise(async resolve => {
        await wait(1)
        this.fakeUsers = []
        resolve()
      })

    await this.requestHandler.trigger<void>(callback, true)
  }

  private async getFakeUsers(): Promise<FakeUser[]> {
    await wait(1)
    const hasError = Math.random() >= 0.5

    if (hasError) {
      throw new Request.Fail()
    }

    return this.fakeUsers
  }
}
