import { ReservationService } from './reservation.service'
import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Get,
  Query
} from '@nestjs/common'
import { GetAllReservationDTO } from './dto/getAllReservation.dto'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getReservations(@Query() reservationDTO: GetAllReservationDTO) {
    return await this.reservationService.getAllReservations(reservationDTO)
  }

  @Delete('/:id')
  async deleteReservation(@Param('id', ParseIntPipe) id: number) {
    return await this.reservationService.deleteReservation(id)
  }
}
