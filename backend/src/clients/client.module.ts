import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { clientRepositoryProvider } from './client.providers';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ClientController],
  providers: [clientRepositoryProvider, ClientService],
})
export class ClientModule {}
