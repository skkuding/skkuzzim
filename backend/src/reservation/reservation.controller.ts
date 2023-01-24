import { Body, Controller, Param, Patch } from '@nestjs/common'
import { ParseIntPipe } from '@nestjs/common/pipes'
import { UpdateReservationDto } from './dto/updateReservation.dto'
import { ReservationService } from './reservation.service'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Patch(':id')
  async reserveUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationParams: UpdateReservationDto
  ) {
    return await this.reservationService.updateReservation(
      id,
      updateReservationParams
    )
  }
}
