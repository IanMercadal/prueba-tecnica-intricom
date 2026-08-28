import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { mysqlPoolProvider } from '../persistence/mysql-pool.provider';
import { HotelModule } from '../hotels/hotel.module';
import { ClientModule } from '../clients/client.module';
import { bookingRepositoryProvider } from './booking.providers';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

@Module({
  imports: [ConfigModule, HotelModule, ClientModule],
  controllers: [BookingController],
  providers: [mysqlPoolProvider, bookingRepositoryProvider, BookingService],
})
export class BookingModule {}