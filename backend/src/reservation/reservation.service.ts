import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteReservation(id: number) {
    // reservation 삭제
    await this.prismaService.reservation.delete({
      where: {
        id
      }
    })

    return {
      'reservation id': id
    }
  }
}
