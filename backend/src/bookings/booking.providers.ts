import { Pool } from 'mysql2/promise';
import { AppConfigService } from '../config/app-config.service';
import { FileSystemRepository } from '../persistence/filesystem-repository';
import { MysqlRepository } from '../persistence/mysql-repository';
import { Repository } from '../common/repository.interface';
import { HotelBooking } from '../common/types/entities';
import { MYSQL_POOL } from '../persistence/mysql-pool.provider';

export const BOOKING_REPOSITORY = 'BOOKING_REPOSITORY';

export const bookingRepositoryProvider = {
  provide: BOOKING_REPOSITORY,
  useFactory: async (config: AppConfigService, pool: Pool): Promise<Repository<HotelBooking>> => {
    if (config.dataType === 'DB') {
      return new MysqlRepository<HotelBooking>(pool, 'HotelBooking');
    }
    const repo = new FileSystemRepository<HotelBooking>(config.fsFolder, 'HotelBooking');
    await repo.ensureReady();
    return repo;
  },
  inject: [AppConfigService, MYSQL_POOL],
};