import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const HALF_HOUR = 30 * 60 * 1000

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllReservations(startTime: string, endTime: string) {
    const result = await this.prisma.reservation.findMany({
      where: {
        OR: [
          {
            AND: [
              { startTime: { gte: new Date(startTime) } },
              { startTime: { lt: new Date(endTime) } }
            ]
          },
          {
            AND: [
              { endTime: { gt: new Date(startTime) } },
              { endTime: { lte: new Date(endTime) } }
            ]
          }
        ]
      },
      select: {
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

    const splitedReservationList: {
      startTime: Date
      endTime: Date
      club: string
      people: number
    }[] = []

    result.forEach((item) => {
      for (
        let base = item.startTime.getTime();
        base < item.endTime.getTime();
        base += HALF_HOUR
      ) {
        if (
          base >= new Date(startTime).getTime() &&
          base < new Date(endTime).getTime()
        ) {
          splitedReservationList.push({
            startTime: new Date(base),
            endTime: new Date(base + HALF_HOUR),
            club: item.club,
            people: item.member.length
          })
        }
      }
    })

    const mergedReservationList = splitedReservationList.map(
      (item, index, array) => {
        const overlabedReservations = array.filter(
          (value) => value.startTime.getTime() === item.startTime.getTime()
        )
        return {
          startTime: item.startTime,
          endTime: item.endTime,
          skkuding: overlabedReservations.reduce(
            (accum, object) =>
              object.club === 'skkuding' ? accum + object.people : accum + 0,
            0
          ),
          skkud: overlabedReservations.reduce(
            (accum, object) =>
              object.club === 'skkud' ? accum + object.people : accum + 0,
            0
          ),
          isFull:
            overlabedReservations.reduce(
              (accum, object) => (accum += object.people),
              0
            ) < 8
              ? false
              : true
        }
      }
    )

    const mergedReservationMap = new Map()
    mergedReservationList.forEach((item) => {
      mergedReservationMap.set(JSON.stringify(item), item)
    })

    return new Array(...mergedReservationMap.values())
  }
}
