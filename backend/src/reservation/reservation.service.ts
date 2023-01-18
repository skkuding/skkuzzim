import { updateReservationDto } from './reservation.dto'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateReservation(body: updateReservationDto) {
    const { id, creator, club, startTime, endTime, purpose, member } = body

    if (member.length > 8) {
      throw new Error('member number is more than 8')
    }

    const data_array = member.map((element) => {
      return { reservationId: id, username: element }
    })

    const deleteMany = await this.prismaService.member.deleteMany({
      where: {
        reservationId: {
          equals: id
        },
      }
    })

    const member_add = await this.prismaService.member.createMany({
      data: [...data_array]
    })

    const reservation_update = await this.prismaService.reservation.update({
      where: {
        id: id,
      },
      data: {
        id: id,
        creator: creator,
        club: club,
        startTime: startTime,
        endTime: endTime,
        purpose: purpose,
        updateTime: new Date(),
      }
    })

    return reservation_update
  }
}
