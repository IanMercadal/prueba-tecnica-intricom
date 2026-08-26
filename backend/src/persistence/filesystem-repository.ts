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
    
    async findAll(): Promise<T[]> {
        return [];
    }
}