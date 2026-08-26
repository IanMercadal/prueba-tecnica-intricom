import { Inject, Injectable } from '@nestjs/common';
import type { Repository } from '../common/repository.interface';
import { Hotel } from '../common/types/entities';
import { HOTEL_REPOSITORY } from './hotel.providers';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Injectable()
export class HotelService {
  constructor(@Inject(HOTEL_REPOSITORY) private readonly repo: Repository<Hotel>) {}

  findAll() { return this.repo.findAll(); }
  create(dto: CreateHotelDto) { return this.repo.create(dto); }
}