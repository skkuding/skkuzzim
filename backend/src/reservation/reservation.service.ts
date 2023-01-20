import { createReservationDto } from './reservation.dto'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createReservation(createReservationParams: createReservationDto) {
    const maxMember = 8 // 시간 당 최대 예약 가능 인원
    const { creator, club, startTime, endTime, purpose, members } =
      createReservationParams

    // check startTime and endTime (30분 단위)
    const startTimeDate = new Date(startTime)
    const endTimeDate = new Date(endTime)
    if (
      (startTimeDate.getMinutes() !== 30 && startTimeDate.getMinutes() !== 0) ||
      (endTimeDate.getMinutes() !== 30 && endTimeDate.getMinutes() !== 0)
    )
      throw new BadRequestException('Please check the time format!')

    // check if the room is available (예약 시간에 강의실이 꽉 찼는지 확인 필요)
    // 예약 시간과 겹치는 기존 예약들 쿼리
    const reservationOverlap = await this.prismaService.reservation.findMany({
      where: {
        endTime: {
          gt: startTimeDate
        },
        startTime: {
          lt: endTimeDate
        }
      },
      select: {
        startTime: true,
        endTime: true,
        _count: {
          select: { member: true }
        }
      }
    })

    // 쿼리 결과를 가지고 30분 단위로 인원 확인
    for (
      let timeBlockStart = new Date(startTimeDate);
      timeBlockStart < endTimeDate;
      timeBlockStart.setMinutes(timeBlockStart.getMinutes() + 30)
    ) {
      let reserved = members.length
      reservationOverlap.map((reservationEle) => {
        if (
          timeBlockStart >= reservationEle.startTime &&
          timeBlockStart < reservationEle.endTime
        ) {
          reserved += reservationEle._count.member
        }
      })
      if (reserved > maxMember) throw new BadRequestException('정원 초과!')
    }

    const membersArr = members.map((name) => {
      return { username: name }
    })

    const newReservation = await this.prismaService.reservation.create({
      data: {
        creator,
        club,
        startTime: startTimeDate,
        endTime: endTimeDate,
        purpose,
        member: {
          createMany: {
            data: [...membersArr]
          }
        }
      }
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
      member: getReservationMember.map((name) => name.username)
    }
  }
}
