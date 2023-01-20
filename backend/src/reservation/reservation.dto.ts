import { IsString } from 'class-validator'

export class UpdateReservationDto {
  @IsString()
  creator: string
  @IsString()
  club: string
  @IsString()
  startTime: Date
  @IsString()
  endTime: Date
  @IsString()
  purpose: string
  @IsString({ each: true })
  members: string[]
}
