import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { mysqlPoolProvider } from '../persistence/mysql-pool.provider';
import { bookingRepositoryProvider } from './booking.providers';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

@Module({
  imports: [ConfigModule],
  controllers: [BookingController],
  providers: [mysqlPoolProvider, bookingRepositoryProvider, BookingService],
})
export class BookingModule {}