import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL')
        }
      }
    })
  }

  async update_reservation(
    request_id: number,
    request_creator: string, 
    request_club: string,
    request_startTime: Date, 
    request_endTime: Date,
    request_purpose: string
  ) {
    return prisma.reservation.update({
      where: {
        id: request_id
      },
      data: {
        id: request_id,
        creator: request_creator,
        club: request_club,
        startTime: request_startTime,
        endTime: request_endTime,
        purpose: request_purpose,
        updateTime: new Date(),
      }
    });
  }

  async existing_member_delete(request_id: number) {
    return await prisma.member.delete({
      where: {
        reservationId: request_id,
      }
    });
  }

  async update_member(request_id: number, memberlist: string[]) {
    let data_array: any;
    for (let i = 0; i < memberlist.length; i++) {
      data_array.push({reservationId: request_id, username: memberlist[i]});
    }

    return await prisma.member.createMany({
      data: data_array,
    });
  }
  
}
