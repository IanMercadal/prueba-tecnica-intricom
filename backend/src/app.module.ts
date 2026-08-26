import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './hotels/hotel.module';
import { ClientModule } from './clients/client.module';

@Module({
  imports: [HotelModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
