import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ReservationController } from './reservation.controller'
import { ReservationService } from './reservation.service'

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, PrismaService]
})
export class ReservationModule {}
