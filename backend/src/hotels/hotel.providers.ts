import { Pool } from 'mysql2/promise';
import { AppConfigService } from '../config/app-config.service';
import { FileSystemRepository } from '../persistence/filesystem-repository';
import { MysqlRepository } from '../persistence/mysql-repository';
import { Repository } from '../common/repository.interface';
import { Hotel } from '../common/types/entities';
import { MYSQL_POOL } from '../persistence/mysql-pool.provider';

export const HOTEL_REPOSITORY = 'HOTEL_REPOSITORY';

export const hotelRepositoryProvider = {
  provide: HOTEL_REPOSITORY,
  useFactory: async (config: AppConfigService, pool: Pool): Promise<Repository<Hotel>> => {
    if (config.dataType === 'DB') {
      return new MysqlRepository<Hotel>(pool, 'Hotel');
    }
    const repo = new FileSystemRepository<Hotel>(config.fsFolder, 'Hotel');
    await repo.ensureReady();
    return repo;
  },
  inject: [AppConfigService, MYSQL_POOL],
};