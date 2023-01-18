import { Body, Controller, Patch } from '@nestjs/common'
import { updateReservationDto } from './reservation.dto'
import { ReservationService } from './reservation.service'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @Patch(':id')
  async reserveUpdate(@Body() updateInfo: updateReservationDto) {
    return await this.reservationService.updateReservation(updateInfo)
  }
}
