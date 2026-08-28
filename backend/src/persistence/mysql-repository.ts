import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { Repository } from '../common/repository.interface';

export class MysqlRepository<T extends { id: number }> implements Repository<T> {
    constructor(private readonly pool: Pool, private readonly tableName: string) { }

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

    // funcioon base para crear
    async create(data: Omit<T, 'id' | 'createdDate'>): Promise<T> {
        const fields = Object.keys(data);
        const dbFields = fields.map((f) => this.treatForDbColumn(f));
        const placeholders = fields.map(() => '?').join(', ');
        const values = Object.values(data);
        const createdDate = new Date();

        const [result] = await this.pool.query<ResultSetHeader>(
            `INSERT INTO ${this.tableName} (${dbFields.join(', ')}, CreatedDate) VALUES (${placeholders}, ?)`,
            [...values, createdDate],
        );

        return {
            ...data,
            id: result.insertId,
            createdDate: createdDate.toISOString(),
        } as unknown as T;
    }

    // funcion helper para que cuadren los nombres
    private treatForDbColumn(field: string): string {
        return field.charAt(0).toUpperCase() + field.slice(1);
    }

    // funcion para comprobar si existe un registro por id
    async exists(id: number): Promise<boolean> {
        const [rows] = await this.pool.query<RowDataPacket[]>(
            `SELECT 1 FROM ${this.tableName} WHERE Id = ? LIMIT 1`,
            [id],
        );
        return rows.length > 0;
    }
}