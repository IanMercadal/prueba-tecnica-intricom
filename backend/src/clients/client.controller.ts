import { Controller, Get } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Get()
  findAll() { return this.service.findAll(); }
}
