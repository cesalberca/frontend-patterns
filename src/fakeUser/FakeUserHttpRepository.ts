import { FakeUserRepository } from './FakeUserRepository'
import { RequestHandler } from '../requestHandlers/RequestHandler'
import { Request } from '../Request'
import { wait } from '../utils/wait'
import { FakeUser } from './FakeUser'

export class FakeUserHttpRepository implements FakeUserRepository {
  constructor(private readonly requestHandler: RequestHandler<FakeUser[]>) {}

  public async findAll(): Promise<FakeUser[]> {
    const promise = this.getFakeUsers()

    const response = await this.requestHandler.trigger(promise)

    if (response instanceof Request.Fail) {
      throw new Error('users could not be found.')
    }

    return response.value
  }

  private async getFakeUsers(): Promise<FakeUser[]> {
    await wait(1)
    const hasError = Math.random() >= 0.5

    if (hasError) {
      throw new Error()
    }

    return [{ name: 'César' }, { name: 'Paco' }, { name: 'Alejandro' }]
  }
}
