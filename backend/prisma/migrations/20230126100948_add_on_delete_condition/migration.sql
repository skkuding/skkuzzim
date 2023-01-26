-- DropForeignKey
ALTER TABLE "member" DROP CONSTRAINT "member_reservation_id_fkey";

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
