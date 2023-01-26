import { Club } from '@prisma/client'

export interface GetSpecificReservationResponseDTO {
  total: number
  data: {
    id: number
    creator: string
    club: Club
    startTime: Date
    endTime: Date
    purpose: string
    members: string[]
  }[]
}
