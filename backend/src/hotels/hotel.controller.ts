import { Controller, Get } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelController {
  constructor(private readonly service: HotelService) {}

  @Get()
  findAll() { return this.service.findAll(); }
}