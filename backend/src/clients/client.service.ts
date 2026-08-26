import { Inject, Injectable } from '@nestjs/common';
import type { Repository } from '../common/repository.interface';
import { Client } from '../common/types/entities';
import { CLIENT_REPOSITORY } from './client.providers';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(@Inject(CLIENT_REPOSITORY) private readonly repo: Repository<Client>) {}

  findAll() { return this.repo.findAll(); }
  create(dto: CreateClientDto) { return this.repo.create(dto); }
}
