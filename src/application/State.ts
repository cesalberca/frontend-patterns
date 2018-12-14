import { Subject } from '../Subject'
import { Observer } from '../Observer'

export interface ApplicationState {
  isLoading: boolean
  hasError: boolean
  hasSuccess: boolean
}

export class State implements Subject {
  private readonly _observers: Observer[] = []

  public currentState: ApplicationState

  private static _instance: State | null = null

  public static get instance() {
    if (this._instance === null) {
      this._instance = new State()
    }

    return this._instance
  }

  private constructor() {
    this.currentState = new Proxy(this.getEmptyState(), {
      set: (
        target: ApplicationState,
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

  public getEmptyState(): ApplicationState {
    return {
      isLoading: false,
      hasError: false,
      hasSuccess: false
    }
  }

  public setEmptyState(): void {
    this.currentState.isLoading = false
    this.currentState.hasError = false
    this.currentState.hasSuccess = false
  }

  public notifyAll() {
    this._observers.forEach(observer => observer.notify())
  }

  public register(observer: Observer) {
    this._observers.push(observer)
  }
}
