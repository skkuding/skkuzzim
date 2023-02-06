import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateReservationRequestDto } from './dto/createReservation.dto'
import { GetAllReservationDTO } from './dto/getAllReservation.dto'
import { GetSpecificReservationResponseDTO } from './dto/getSpecificReservaionResponse.dto'
import { GetSpecificReservationRequestDTO } from './dto/getSpecificReservationRequest.dto'
import { RespondGetAllReservationRequestDTO } from './dto/respondGetAllReservationRequest.dto'
import { UpdateReservationDto } from './dto/updateReservation.dto'

const HALF_HOUR = 30 * 60 * 1000

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllReservations(
    reservationDTO: GetAllReservationDTO
  ): Promise<RespondGetAllReservationRequestDTO[]> {
    const { startTime, endTime } = reservationDTO
    const start = new Date(startTime)
    const end = new Date(endTime)
    if (start >= end) {
      throw new BadRequestException()
    }
    const result = await this.prismaService.reservation.findMany({
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
          },
          {
            AND: [
              { startTime: { lte: new Date(startTime) } },
              { endTime: { gte: new Date(endTime) } }
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

    const mergedReservationList: RespondGetAllReservationRequestDTO[] =
      splitedReservationList.map((item, index, array) => {
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
      })

    const mergedReservationMap: Map<
      string,
      RespondGetAllReservationRequestDTO
    > = new Map()
    mergedReservationList.forEach((item) => {
      mergedReservationMap.set(JSON.stringify(item), item)
    })

    return new Array(...mergedReservationMap.values())
  }

  async createReservation(
    createReservationParams: CreateReservationRequestDto
  ) {
    const maxMember = 8 // 시간 당 최대 예약 가능 인원
    const { creator, club, startTime, endTime, purpose, members } =
      createReservationParams

    // check startTime and endTime (30분 단위)
    // add 9 hours to support korean timezone
    const startTimeDate = new Date(
      new Date(startTime).getTime() + 9 * 3600 * 1000
    )
    const endTimeDate = new Date(new Date(endTime).getTime() + 9 * 3600 * 1000)

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
      members: getReservationMember.map((name) => name.username)
    }
  }

  async deleteReservation(id: number) {
    // reservation 삭제
    return await this.prismaService.reservation.delete({
      where: {
        id
      }
    })
  }

  async getSpecificReservation(
    reservationDTO: GetSpecificReservationRequestDTO
  ): Promise<GetSpecificReservationResponseDTO> {
    const { startTime, endTime } = reservationDTO
    const start = new Date(startTime)
    const end = new Date(endTime)
    if (start >= end) {
      throw new BadRequestException()
    }
    const rawData = await this.prismaService.reservation.findMany({
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
          },
          {
            AND: [
              { startTime: { lte: new Date(startTime) } },
              { endTime: { gte: new Date(endTime) } }
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

  async updateReservation(
    idWeFind: number,
    updateReservationParams: UpdateReservationDto
  ) {
    const { creator, club, startTime, endTime, purpose, members } =
      updateReservationParams

    //check startTime and endTime
    // add 9 hours to support korean timezone
    const startTimeDate = new Date(
      new Date(startTime).getTime() + 9 * 3600 * 1000
    )
    const endTimeDate = new Date(new Date(endTime).getTime() + 9 * 3600 * 1000)
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
        startTime: startTimeDate,
        endTime: endTimeDate,
        purpose: purpose
      }
    })

    return {
      ...reservationUpdate,
      members
    }
  }
}
