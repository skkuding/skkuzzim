import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteReservation(id: number) {
    // relation 해제, member 삭제
    await this.prismaService.reservation.update({
      where: {
        id: Number(id)
      },
      data: {
        member: {
          deleteMany: {}
        }
      }
    })

    // reservation 삭제
    await this.prismaService.reservation.delete({
      where: {
        id: Number(id)
      }
    })

    return {
      'reservation id': id
    }
  }
}
