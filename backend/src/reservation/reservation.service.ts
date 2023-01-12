import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { info_per_time } from './reservation.dto';

@Injectable()
export class ReservationService {
    constructor(private readonly prismaService: PrismaService) {}

    total_view(start:Date,end:Date):info_per_time{
        let result = new info_per_time;
        this.prismaService
        return result;
    }
}
