import { createReservationDto } from './reservation.dto'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createReservation(createReservationParams: createReservationDto) {
    const { creator, club, startTime, endTime, purpose, member } =
      createReservationParams

    const membersArr = member.map((e) => {
      return { username: e }
    })

    const newReservation = await this.prismaService.reservation.create({
      data: {
        creator,
        club,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        purpose,
        member: {
          createMany: {
            data: [...membersArr]
          }
        }
      }
    })

    return newReservation
  }
}
