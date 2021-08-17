/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Meet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Meet.code_index";

-- CreateIndex
CREATE UNIQUE INDEX "Meet.code_unique" ON "Meet"("code");
