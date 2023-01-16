export class createReservationDto {
  id: number
  creator: string
  club: string
  startTime: Date
  endTime: Date
  purpose: string
  member: Array<string>
}
