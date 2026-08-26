import { Controller, Get } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
  constructor(private readonly service: BookingService) {}

  @Get()
  findAll() { return this.service.findAll(); }
}