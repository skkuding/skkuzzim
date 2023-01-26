import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}
  async getSpecificReservation(start: string, end: string) {
    const rawData = await this.prismaService.reservation.findMany({
      where: {
        OR: [
          {
            startTime: {
              gte: new Date(start),
              lte: new Date(end)
            }
          },
          {
            endTime: {
              gte: new Date(start),
              lte: new Date(end)
            }
          },
          {
            AND:[
              {
                startTime:{
                  lte: new Date(start)
                }
              },{
                endTime:{
                  gte: new Date(end)
                }
              }
            ]
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
      total: rawData.length,
      data: rawData.map((item) => {
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
          members: member
        }
      })
    }
    return results
  }
}
