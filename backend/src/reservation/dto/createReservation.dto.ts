import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator'
import { Club } from '@prisma/client'

export class CreateReservationRequestDto {
  @IsString()
  creator: string

  @IsEnum(Club)
  club: Club

  @IsString()
  startTime: string

  @IsString()
  endTime: string

  @IsOptional()
  @IsString()
  purpose: string

  @IsArray()
  members: string[]
}
