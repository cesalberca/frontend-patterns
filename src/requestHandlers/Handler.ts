export interface Handler<T> {
  next: (context: T) => void
  setNext: (handler: Handler<T>) => void
}
