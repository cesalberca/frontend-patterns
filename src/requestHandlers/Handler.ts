export interface Handler<T = unknown> {
  next: (context: T) => void
  setNext: (handler: Handler<T>) => void
}
