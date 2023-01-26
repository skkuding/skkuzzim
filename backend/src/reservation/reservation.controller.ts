import { Controller, Get, Query } from '@nestjs/common'
import { ReservationService } from './reservation.service'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @Get('detail')
  async getSpecificReservations(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string
  ) {
    return await this.reservationService.getSpecificReservation(startTime, endTime)
  }
}
