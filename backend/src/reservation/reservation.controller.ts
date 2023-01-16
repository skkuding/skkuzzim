import { Controller, Get, Query } from '@nestjs/common'
import { ReservationService } from './reservation.service'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @Get('detail')
  getSpecificReservations(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string
  ) {
    console.log(startTime, endTime)
    return this.reservationService.specificReservation(startTime, endTime)
  }
}
