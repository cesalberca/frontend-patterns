import { Subject } from './Subject'
import { Observer } from './Observer'
import { State } from './State'

export class StateManager implements Subject {
  private readonly _observers: Observer[] = []

  public state: State

  private static _instance: StateManager | null = null

  public static get instance() {
    if (this._instance === null) {
      this._instance = new StateManager()
    }

    return this._instance
  }

  private constructor() {
    this.state = new Proxy(this.getEmptyState(), {
      set: (
        target: State,
        p: PropertyKey,
        value: any,
        receiver: any
      ): boolean => {
        Reflect.set(target, p, value, receiver)
        this.notifyAll()
        return true
      }
    })
  }

  public getEmptyState(): State {
    return {
      isLoading: false,
      hasError: false,
      hasSuccess: false,
      users: []
    }
  }

  public setEmptyState(): void {
    this.state.isLoading = false
    this.state.hasError = false
    this.state.hasSuccess = false
    this.state.users = []
  }

  public notifyAll() {
    this._observers.forEach(observer => observer.notify())
  }

  public register(observer: Observer) {
    this._observers.push(observer)
  }
}
