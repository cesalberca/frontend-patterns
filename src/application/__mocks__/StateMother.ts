export class StateMother {
  public getState(): any {
    return {
      isLoading: jest.fn(),
      hasError: jest.fn(),
      hasSuccess: jest.fn()
    }
  }
}
