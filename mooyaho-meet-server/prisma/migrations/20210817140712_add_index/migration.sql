/*
  Warnings:

  - Added the required column `code` to the `Meet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "channelId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Meet" ("channelId", "id", "userId") SELECT "channelId", "id", "userId" FROM "Meet";
DROP TABLE "Meet";
ALTER TABLE "new_Meet" RENAME TO "Meet";
CREATE INDEX "Meet.code_index" ON "Meet"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
