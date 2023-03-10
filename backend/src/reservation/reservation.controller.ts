import { ReservationService } from './reservation.service'
import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Get,
  Query,
  Post,
  Patch,
  Body
} from '@nestjs/common'
import { CreateReservationRequestDto } from './dto/createReservation.dto'
import { GetAllReservationDTO } from './dto/getAllReservation.dto'
import { GetSpecificReservationRequestDTO } from './dto/getSpecificReservationRequest.dto'
import { UpdateReservationDto } from './dto/updateReservation.dto'

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

  @Delete('/:id')
  async deleteReservation(@Param('id', ParseIntPipe) id: number) {
    return await this.reservationService.deleteReservation(id)
  }

  @Get('detail')
  async getSpecificReservations(
    @Query() reservationDTO: GetSpecificReservationRequestDTO
  ) {
    return await this.reservationService.getSpecificReservation(reservationDTO)
  }

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
