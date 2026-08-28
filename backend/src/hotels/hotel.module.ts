import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { mysqlPoolProvider } from '../persistence/mysql-pool.provider';
import { hotelRepositoryProvider } from './hotel.providers';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';

@Module({
  imports: [ConfigModule],
  controllers: [HotelController],
  providers: [mysqlPoolProvider, hotelRepositoryProvider, HotelService],
  exports: [hotelRepositoryProvider],
})
export class HotelModule {}