import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
