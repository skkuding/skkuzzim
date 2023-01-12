import { Controller,Get,Query } from '@nestjs/common';
import { info_per_time } from './reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService) {}
    @Get()
    total_info(@Query('start_date') start_date:Date, @Query('end_date') end_date:Date):info_per_time{
        return this.reservationService.total_view(start_date,end_date);
    }
}
