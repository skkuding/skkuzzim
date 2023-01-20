import { IsArray, IsString } from 'class-validator'

export class CreateReservationRequestDto {
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
