import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { hotelRepositoryProvider } from './hotel.providers';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';

@Module({
  imports: [ConfigModule],
  controllers: [HotelController],
  providers: [hotelRepositoryProvider, HotelService],
})
export class HotelModule {}