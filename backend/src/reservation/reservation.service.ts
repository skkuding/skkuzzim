import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

const HALF_HOUR = 30 * 60 * 1000;

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllReservation(startTime: string, endTime: string) {
    const result = await this.prisma.reservation.findMany({
      where: {
        AND: [
          {
            startTime: {
              gte: new Date(startTime),
            },
          },
          {
            endTime: {
              lte: new Date(endTime),
            },
          },
        ],
      },
      select: {
        startTime: true,
        endTime: true,
        club: true,
        member: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    const splitedReservationList: {
      startTime: Date;
      endTime: Date;
      club: string;
      people: number;
    }[] = [];

    result.forEach((item) => {
      for (
        let base = item.startTime.getTime();
        base < item.endTime.getTime();
        base += HALF_HOUR
      ) {
        splitedReservationList.push({
          startTime: new Date(base),
          endTime: new Date(base + HALF_HOUR),
          club: item.club,
          people: item.member.length,
        });
      }
    });

    const mergedReservationList = splitedReservationList.map(
      (item, index, array) => {
        const a = array.filter(
          (value) => value.startTime.getTime() === item.startTime.getTime(),
        );
        return {
          startTime: item.startTime,
          endTime: item.endTime,
          skkuding: a.reduce(
            (accum, object) =>
              object.club === 'skkuding' ? accum + object.people : accum + 0,
            0,
          ),
          skku_d: a.reduce(
            (accum, object) =>
              object.club === 'skku_d' ? accum + object.people : accum + 0,
            0,
          ),
          isFull:
            a.reduce((accum, object) => (accum += object.people), 0) < 8
              ? false
              : true,
        };
      },
    );

    const mergedReservationMap = new Map();
    mergedReservationList.forEach((item) => {
      mergedReservationMap.set(JSON.stringify(item), item);
    });

    return new Array(...mergedReservationMap.values());
  }

  async createReservation(
    name: string,
    club: string,
    startTime: string,
    endTime: string,
    purpose: string,
    member: string[],
  ) {
    const memberObj = member.map((item) => {
      return { username: item };
    });
    return await this.prisma.reservation.create({
      data: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        club,
        purpose,
        member: {
          create: [
            {
              username: name,
            },
            ...memberObj,
          ],
        },
      },
    });
  }
}
