import { Body, Controller, Param, Patch } from '@nestjs/common'
import { ParseIntPipe } from '@nestjs/common/pipes'
import { UpdateReservationDto } from './reservation.dto'
import { ReservationService } from './reservation.service'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @Patch(':id')
  async reserveUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInfo: UpdateReservationDto
  ) {
    return await this.reservationService.updateReservation(id, updateInfo)
  }
}
