import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Repository } from '../common/repository.interface';
import { Hotel } from '../common/types/entities';
import { HOTEL_REPOSITORY } from './hotel.providers';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelService {
  constructor(@Inject(HOTEL_REPOSITORY) private readonly repo: Repository<Hotel>) {}

  findAll() { return this.repo.findAll(); }
  create(dto: CreateHotelDto) { return this.repo.create(dto); }

  async update(id: number, dto: UpdateHotelDto) {
    const updated = await this.repo.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Hotel con id ${id} no encontrado`);
    }
    return updated;
  }
}