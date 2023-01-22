import { UpdateReservationDto } from './reservation.dto'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateReservation(
    idWeFind: number,
    updateReservationParams: UpdateReservationDto
  ) {
    const { creator, club, startTime, endTime, purpose, members } =
      updateReservationParams

    //check startTime and endTime
    const startTimeDate = new Date(startTime)
    const endTimeDate = new Date(endTime)
    const maxMember = 8

    if (
      (startTimeDate.getMinutes() !== 30 && startTimeDate.getMinutes() !== 0) ||
      (endTimeDate.getMinutes() !== 30 && endTimeDate.getMinutes() !== 0)
    )
      throw new BadRequestException('Please check the time format!')

    //check reservation overlaps
    const reservationOverlap = await this.prismaService.reservation.findMany({
      where: {
        NOT: [{ id: idWeFind }],
        AND: [
          {
            endTime: {
              gt: startTimeDate
            }
          },
          {
            startTime: {
              lt: endTimeDate
            }
          }
        ]
      },
      select: {
        startTime: true,
        endTime: true,
        member: {
          select: {
            username: true
          }
        }
      }
    })

    for (
      let timeBlockstart = new Date(startTime);
      timeBlockstart < endTimeDate;
      timeBlockstart.setMinutes(timeBlockstart.getMinutes() + 30)
    ) {
      let reservedMembers = members.length
      reservationOverlap.map((eachReservation) => {
        if (
          timeBlockstart >= eachReservation.startTime &&
          timeBlockstart < eachReservation.endTime
        ) {
          reservedMembers += eachReservation.member.length
        }
      })
      if (reservedMembers > maxMember) 
        throw new BadRequestException('정원 초과!')
    }

    //update member database
    const dataArray = members.map((member) => {
      return { reservationId: idWeFind, username: member }
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

    //update reservation database
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

    return {
      ...reservationUpdate,
      members
    }
  }
}
