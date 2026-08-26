import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { Repository } from '../common/repository.interface';

export class MysqlRepository<T extends { id: number }> implements Repository<T> {
    constructor(private readonly pool: Pool, private readonly tableName: string) {}

    // funcion base para obtener datos desde bd
    async findAll(): Promise<T[]> {
        const [rows] = await this.pool.query<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} ORDER BY Id`,
        );
        return rows.map((r) => this.toEntity(r));
    }

    // funcion que nos tratará los nombres de los campos de bd para TypeScript
    private toEntity(row: RowDataPacket): T {
        const entity: any = { id: row.Id, createdDate: row.CreatedDate };
        for (const key of Object.keys(row)) {
            if (key !== 'Id' && key !== 'CreatedDate') {
                entity[key.charAt(0).toLowerCase() + key.slice(1)] = row[key];
            }
        }
        return entity as T;
    }
}