import { IsString, IsDateString } from 'class-validator'

export class UpdateReservationDto {
  @IsString()
  creator: string
  @IsString()
  club: string
  @IsDateString()
  startTime: Date
  @IsDateString()
  endTime: Date
  @IsString()
  purpose: string
  @IsString({ each: true })
  members: string[]
}
