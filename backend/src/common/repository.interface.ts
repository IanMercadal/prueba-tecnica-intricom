export interface Repository<T extends { id: number }> {
  findAll(): Promise<T[]>;
  create(data: Omit<T, 'id' | 'createdDate'>): Promise<T>;
  exists(id: number): Promise<boolean>;
  // update()
}