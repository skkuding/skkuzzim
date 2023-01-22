import { IsString, IsDateString, IsOptional } from 'class-validator'

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
  @IsOptional()
  purpose: string
  
  @IsString({ each: true })
  members: string[]
}
