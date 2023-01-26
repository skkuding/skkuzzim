import { CreateReservationRequestDto } from './reservation.dto'
import { ReservationService } from './reservation.service'
import { Controller, Get, Query, Post, Body } from '@nestjs/common'
import { GetAllReservationDTO } from './dto/getAllReservation.dto'
import { ReservationService } from './reservation.service'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getReservations(@Query() reservationDTO: GetAllReservationDTO) {
    return await this.reservationService.getAllReservations(reservationDTO)
  }

  @Post()
  async createReservation(
    @Body() createReservationParams: CreateReservationRequestDto
  ) {
    return await this.reservationService.createReservation(
      createReservationParams
    )
  }
}
