import { promises as fs } from 'fs';
import * as path from 'path';
import { Repository } from '../common/repository.interface';

interface Metadata {
    TOTAL_REGISTRIES: number;
    LAST_INDEX: number;
}

export class FileSystemRepository <T extends { id:number }> implements Repository<T> {
    private readonly folderPath: string;
    private readonly metadataPath: string;

    constructor(baseFolder: string, entityName: string) {
        this.folderPath = path.join(baseFolder, entityName);
        this.metadataPath = path.join(this.folderPath, '_metadata.json')
    }

    // funcion que comprueba carpeta fs al arrancar y crear si no existe
    async ensureReady(): Promise<void> {
        await fs.mkdir(this.folderPath, { recursive: true });
        try {
            await fs.access(this.metadataPath);
        } catch (error) {
            await this.writeMetadata({ TOTAL_REGISTRIES: 0, LAST_INDEX: 0 });
        }
    }

    // funcion que genera carpeta
    private async writeMetadata(metadata: Metadata): Promise<void> {
        await fs.writeFile(this.metadataPath, JSON.stringify(metadata, null, 2));
    }

    // funcion que lee la metadata actual
    private async readMetadata(): Promise<Metadata> {
        const rawData = await fs.readFile(this.metadataPath, 'utf-8');
        return JSON.parse(rawData) as Metadata;
    }

    // funcion para obtener datos desde data/Hotel/*
    async findAll(): Promise<T[]> {
        const files = await fs.readdir(this.folderPath);
        const recordFiles = files.filter((f) => f !== '_metadata.json');
        const records = await Promise.all(
            recordFiles.map(async(file) => {
                const rawData = await fs.readFile(path.join(this.folderPath, file), 'utf-8');
                return JSON.parse(rawData) as T;
            })
        )
        return records.sort((a, b) => a.id - b.id);
    }

    // funcion para crear un registro en data/Hotel/{id}.json
    async create(data: Omit<T, 'id' | 'createdDate'>): Promise<T> {
        const metadata = await this.readMetadata();
        const id = metadata.LAST_INDEX + 1;
        const entity = { ...data, id, createdDate: new Date().toISOString() } as unknown as T;

        await fs.writeFile(path.join(this.folderPath, `${id}.json`), JSON.stringify(entity, null, 2));

        metadata.LAST_INDEX = id;
        metadata.TOTAL_REGISTRIES += 1;
        await this.writeMetadata(metadata);

        return entity;
    }

    // funcion para comprobar si existe un registro por id
    async exists(id: number): Promise<boolean> {
        try {
            await fs.access(path.join(this.folderPath, `${id}.json`));
            return true;
        } catch {
            return false;
        }
    }

    // funcion para actualizar un registro en data/Hotel/{id}.json
    async update(id: number, data: Partial<Omit<T, 'id' | 'createdDate'>>): Promise<T | null> {
        const filePath = path.join(this.folderPath, `${id}.json`);
        let existing: T;
        try {
            const rawData = await fs.readFile(filePath, 'utf-8');
            existing = JSON.parse(rawData) as T;
        } catch {
            return null;
        }

        const updated = { ...existing, ...data } as T;
        await fs.writeFile(filePath, JSON.stringify(updated, null, 2));
        return updated;
    }
}