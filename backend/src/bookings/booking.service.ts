import { Inject, Injectable } from '@nestjs/common';
import type { Repository } from '../common/repository.interface';
import { HotelBooking } from '../common/types/entities';
import { BOOKING_REPOSITORY } from './booking.providers';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(@Inject(BOOKING_REPOSITORY) private readonly repo: Repository<HotelBooking>) {}

  findAll() { return this.repo.findAll(); }
  create(dto: CreateBookingDto) { return this.repo.create(dto); }
}