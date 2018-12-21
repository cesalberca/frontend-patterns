export interface Repository<T> {
  findAll: () => Promise<T[]>
  deleteAll: () => Promise<void>
}
