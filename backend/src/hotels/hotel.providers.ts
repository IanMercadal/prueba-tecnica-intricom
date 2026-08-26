import { AppConfigService } from '../config/app-config.service';
import { FileSystemRepository } from '../persistence/filesystem-repository';
import { Repository } from '../common/repository.interface';
import { Hotel } from '../common/types/entities';

export const HOTEL_REPOSITORY = 'HOTEL_REPOSITORY';

export const hotelRepositoryProvider = {
  provide: HOTEL_REPOSITORY,
  useFactory: async (config: AppConfigService): Promise<Repository<Hotel>> => {
    const repo = new FileSystemRepository<Hotel>(config.fsFolder, 'Hotel');
    await repo.ensureReady();
    return repo;
  },
  inject: [AppConfigService],
};