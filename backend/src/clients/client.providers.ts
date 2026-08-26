import { Pool } from 'mysql2/promise';
import { AppConfigService } from '../config/app-config.service';
import { FileSystemRepository } from '../persistence/filesystem-repository';
import { MysqlRepository } from '../persistence/mysql-repository';
import { Repository } from '../common/repository.interface';
import { Client } from '../common/types/entities';
import { MYSQL_POOL } from '../persistence/mysql-pool.provider';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

export const clientRepositoryProvider = {
  provide: CLIENT_REPOSITORY,
  useFactory: async (config: AppConfigService, pool: Pool): Promise<Repository<Client>> => {
    if (config.dataType === 'DB') {
      return new MysqlRepository<Client>(pool, 'Client');
    }
    const repo = new FileSystemRepository<Client>(config.fsFolder, 'Client');
    await repo.ensureReady();
    return repo;
  },
  inject: [AppConfigService, MYSQL_POOL],
};
