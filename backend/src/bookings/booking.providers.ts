import { AppConfigService } from '../config/app-config.service';
import { FileSystemRepository } from '../persistence/filesystem-repository';
import { Repository } from '../common/repository.interface';
import { HotelBooking } from '../common/types/entities';

export const BOOKING_REPOSITORY = 'BOOKING_REPOSITORY';

export const bookingRepositoryProvider = {
  provide: BOOKING_REPOSITORY,
  useFactory: async (config: AppConfigService): Promise<Repository<HotelBooking>> => {
    const repo = new FileSystemRepository<HotelBooking>(config.fsFolder, 'HotelBooking');
    await repo.ensureReady();
    return repo;
  },
  inject: [AppConfigService],
};