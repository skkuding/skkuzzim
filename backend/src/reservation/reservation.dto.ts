import { IsArray, IsString } from 'class-validator'

export class createReservationRequestDto {
  @IsString()
  creator: string

  @IsString()
  club: string

  @IsString()
  startTime: string

  @IsString()
  endTime: string

  @IsString()
  purpose: string

  @IsArray()
  members: string[]
}
