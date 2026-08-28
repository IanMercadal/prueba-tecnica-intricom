import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Repository } from '../common/repository.interface';
import { Client, Hotel, HotelBooking } from '../common/types/entities';
import { BOOKING_REPOSITORY } from './booking.providers';
import { HOTEL_REPOSITORY } from '../hotels/hotel.providers';
import { CLIENT_REPOSITORY } from '../clients/client.providers';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

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

  async update(id: number, dto: UpdateBookingDto) {
    const [hotelOk, clientOk] = await Promise.all([
      dto.hotelId !== undefined ? this.hotelRepo.exists(dto.hotelId) : Promise.resolve(true),
      dto.clientId !== undefined ? this.clientRepo.exists(dto.clientId) : Promise.resolve(true),
    ]);

    if (!hotelOk) {
      throw new BadRequestException('El hotelId indicado no existe');
    }
    if (!clientOk) {
      throw new BadRequestException('El clientId indicado no existe');
    }

    const updated = await this.repo.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }
    return updated;
  }
}