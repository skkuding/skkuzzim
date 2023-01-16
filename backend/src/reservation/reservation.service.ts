import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}
  async specificReservation(start: string, end: string) {
    const dbresults = await this.prismaService.reservation.findMany({
      where: {
        AND: [
          {
            startTime: {
              gte: new Date(start)
            }
          },
          {
            endTime: {
              lte: new Date(end)
            }
          }
        ]
      },
      select: {
        id: true,
        creator: true,
        purpose: true,
        startTime: true,
        endTime: true,
        club: true,
        member: {
          select: {
            username: true
          }
        }
      },
      orderBy: {
        startTime: 'asc'
      }
    })
    const results = {
      total: dbresults.length,
      data: dbresults.map((item) => {
        const member = item.member.map((element) => {
          return element.username
        })
        return {
          id: item.id,
          creator: item.creator,
          club: item.club,
          startTime: item.startTime,
          endTime: item.endTime,
          purpose: item.purpose,
          member: member
        }
      })
    }
    return results
  }
}
