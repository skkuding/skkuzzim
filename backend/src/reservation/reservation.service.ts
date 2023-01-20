import { UpdateReservationDto } from './reservation.dto'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateReservation(idWeFind: number, body: UpdateReservationDto) {
    const { creator, club, startTime, endTime, purpose, members } = body
    
    const sameTime = await this.prismaService.reservation.findMany({
      where: {
        NOT: [{ id: idWeFind }],
        AND: [
          {
            startTime: {
              gte: new Date(startTime)
            }
          },
          {
            endTime: {
              lte: new Date(endTime)
            }
          }
        ]
      },
      select: {
        member: {
          select: {
            username: true
          }
        }
      }
    })

    let sameTimeMembers = 0
    sameTime.forEach((eachReservation) => {
      sameTimeMembers += eachReservation.member.length
      console.log(eachReservation.member)
    })
    
    if (sameTimeMembers + members.length > 8) {
      throw new Error('member number at that time is more than 8')
    }

    const dataArray = members.map((member) => {
      return { reservationId: id, username: member }
    })

    await this.prismaService.member.deleteMany({
      where: {
        reservationId: {
          equals: idWeFind
        }
      }
    })
    await this.prismaService.member.createMany({
      data: dataArray
    })

    const reservationUpdate = await this.prismaService.reservation.update({
      where: {
        id: idWeFind
      },
      data: {
        creator: creator,
        club: club,
        startTime: startTime,
        endTime: endTime,
        purpose: purpose
      }
    })

    return reservationUpdate
  }
}
