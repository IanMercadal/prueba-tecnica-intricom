import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { mysqlPoolProvider } from '../persistence/mysql-pool.provider';
import { clientRepositoryProvider } from './client.providers';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ClientController],
  providers: [mysqlPoolProvider, clientRepositoryProvider, ClientService],
})
export class ClientModule {}
