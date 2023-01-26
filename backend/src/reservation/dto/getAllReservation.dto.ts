import { IsDateString, IsNotEmpty } from 'class-validator'

export class GetAllReservationDTO {
  @IsDateString()
  @IsNotEmpty()
  readonly startTime: string

  @IsDateString()
  @IsNotEmpty()
  readonly endTime: string
}
