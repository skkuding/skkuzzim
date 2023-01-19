import { Controller, Get, Query } from '@nestjs/common'
import { GetAllReservationDTO } from './dto/getAllReservation.dto'
import { ReservationService } from './reservation.service'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getReservations(@Query() reservationDTO: GetAllReservationDTO) {
    return await this.reservationService.getAllReservations(reservationDTO)
  }
}
