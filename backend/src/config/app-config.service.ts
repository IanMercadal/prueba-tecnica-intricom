import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

@Injectable() 
export class AppConfigService {
    constructor(private config: ConfigService) {}

    // Comprobamos tipo de dato establecido en la conf
    get dataType(): 'FS' | 'DB' {
        const value = this.config.get<string>('DATA_TYPE');
        if(value !== 'FS' && value !== 'DB') {
            throw new Error('Tipo de dato establecido en configuración no válido');
        }

        return value;
    }

    // Traemos la ruta para el repositorio fs
    get fsFolder(): string {
        return this.config.get<string>('FS_FOLDER', './data');
    }

    // Configuración base de datos
    get dbConfig() {
        return {
            host: this.config.get<string>('DB_HOST', '127.0.0.1'),
            port: this.config.get<number>('DB_PORT', 3306),
            user: this.config.get<string>('DB_USER', 'root'),
            password: this.config.get<string>('DB_PASSWORD', ''),
            database: this.config.get<string>('DB_NAME', 'prueba_tecnica_intricom'),
        }
    }
}