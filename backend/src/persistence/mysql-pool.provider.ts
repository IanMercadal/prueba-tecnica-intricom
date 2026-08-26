import { createPool, Pool } from 'mysql2/promise';
import { AppConfigService } from '../config/app-config.service';

export const MYSQL_POOL = 'MYSQL_POOL';

export const mysqlPoolProvider = {
    provide: MYSQL_POOL,
    useFactory: (config: AppConfigService): Pool => {
        return createPool({ ...config.dbConfig, waitForConnections: true });
    },
    inject: [AppConfigService],
};