-- DropForeignKey
ALTER TABLE "Time" DROP CONSTRAINT "Time_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
