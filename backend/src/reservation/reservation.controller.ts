import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}
    @Patch(':id')
    async reserveUpdate(@Body() body: any) {
        return await this.reservationService.updateReservation(body);
    }  
}
