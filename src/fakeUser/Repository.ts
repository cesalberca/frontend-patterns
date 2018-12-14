export interface Repository<T> {
  findAll: () => Promise<T[]>
}
