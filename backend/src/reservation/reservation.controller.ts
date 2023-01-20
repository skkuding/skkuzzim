import { CreateReservationRequestDto } from './reservation.dto'
import { ReservationService } from './reservation.service'
import { Controller, Post, Body } from '@nestjs/common'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async createReservation(
    @Body() createReservationParams: CreateReservationRequestDto
  ) {
    return await this.reservationService.createReservation(
      createReservationParams
    )
  }
}
