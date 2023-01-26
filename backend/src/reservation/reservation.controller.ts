import { ReservationService } from './reservation.service'
import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Delete('/:id')
  async deleteReservation(@Param('id', ParseIntPipe) id: number) {
    return await this.reservationService.deleteReservation(id)
  }
}
