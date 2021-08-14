-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "channelId" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Meet" ("channelId", "id", "userId") SELECT "channelId", "id", "userId" FROM "Meet";
DROP TABLE "Meet";
ALTER TABLE "new_Meet" RENAME TO "Meet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
