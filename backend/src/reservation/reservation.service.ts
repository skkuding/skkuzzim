import { createReservationDto } from './reservation.dto'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createReservation(createReservationParams: createReservationDto) {
    const { creator, club, startTime, endTime, purpose, members } =
      createReservationParams

    const membersArr = members.map((name) => {
      return { username: name }
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
      // create 이전에 해당 시간에 자리가 있는지 확인 필요
    })

    // get member of the reservation
    const getReservationMember = await this.prismaService.member.findMany({
      where: {
        reservationId: newReservation.id
      },
      select: {
        username: true
      }
    })

    return {
      ...newReservation,
      member: getReservationMember.map((e) => e.username)
    }
  }
}
