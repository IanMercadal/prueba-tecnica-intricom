export interface Repository<T extends { id: number }> {
  findAll(): Promise<T[]>;
  // create()
  // update()
}