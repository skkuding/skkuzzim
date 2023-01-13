import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getReservation(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return await this.reservationService.getAllReservation(startTime, endTime);
  }

  @Post()
  async createReservation(
    @Body('name') name: string,
    @Body('club') club: string,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
    @Body('purpose') purpose: string,
    @Body('member') member: string[],
  ) {
    await this.reservationService.createReservation(
      name,
      club,
      startTime,
      endTime,
      purpose,
      member,
    );
  }
}
