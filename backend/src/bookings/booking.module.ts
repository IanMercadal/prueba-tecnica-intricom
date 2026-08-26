import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { bookingRepositoryProvider } from './booking.providers';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

@Module({
  imports: [ConfigModule],
  controllers: [BookingController],
  providers: [bookingRepositoryProvider, BookingService],
})
export class BookingModule {}