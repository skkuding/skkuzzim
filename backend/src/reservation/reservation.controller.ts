import { ReservationService } from './reservation.service'
import { Controller, Delete, Param } from '@nestjs/common'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Delete('/:id')
  async deleteReservation(@Param('id') id: number) {
    return this.reservationService.deleteReservation(id)
  }
}
