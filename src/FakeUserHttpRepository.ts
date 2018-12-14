import { FakeUserRepository } from './FakeUserRepository'
import { RequestHandler, ResponseError } from './requestHandlers/RequestHandler'
import { wait } from './utils/wait'

export interface FakeUser {
  name: string
}

export class FakeUserHttpRepository implements FakeUserRepository {
  constructor(private readonly requestHandler: RequestHandler<FakeUser[]>) {}

  public async findAll(): Promise<FakeUser[]> {
    const promise = this.getFakeUsers()

    const response = await this.requestHandler.trigger(promise)

    if (response instanceof ResponseError) {
      throw new Error('users could not be found, error.')
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
