import { Body, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateReservation(@Body() body: any) {
    await this.prismaService.update_reservation(body.data.id, body.data.creator, body.data.club, body.data.startTime, body.data.endTime, body.data.purpose);
    await this.prismaService.existing_member_delete(body.data.id);
    await this.prismaService.update_member(body.data.id, body.data.member);
  }
}
