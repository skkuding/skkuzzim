import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator'
import { Club } from '@prisma/client'

export class CreateReservationRequestDto {
  @IsString()
  creator: string

  @IsEnum(Club)
  club: Club

  @IsDateString()
  startTime: string

  @IsDateString()
  endTime: string

  @IsOptional()
  @IsString()
  purpose: string

  @IsArray()
  members: string[]
}
