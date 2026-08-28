import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { Repository } from '../common/repository.interface';
import { Client, Hotel, HotelBooking } from '../common/types/entities';
import { BOOKING_REPOSITORY } from './booking.providers';
import { HOTEL_REPOSITORY } from '../hotels/hotel.providers';
import { CLIENT_REPOSITORY } from '../clients/client.providers';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @Inject(BOOKING_REPOSITORY) private readonly repo: Repository<HotelBooking>,
    @Inject(HOTEL_REPOSITORY) private readonly hotelRepo: Repository<Hotel>,
    @Inject(CLIENT_REPOSITORY) private readonly clientRepo: Repository<Client>,
  ) {}

  findAll() { return this.repo.findAll(); }

  async create(dto: CreateBookingDto) {
    const [hotelExists, clientExists] = await Promise.all([
      this.hotelRepo.exists(dto.hotelId),
      this.clientRepo.exists(dto.clientId),
    ]);

    if (!hotelExists) {
      throw new BadRequestException('El hotelId indicado no existe');
    }
    if (!clientExists) {
      throw new BadRequestException('El clientId indicado no existe');
    }

    return this.repo.create(dto);
  }
}