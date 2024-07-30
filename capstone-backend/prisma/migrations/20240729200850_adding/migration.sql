-- CreateTable
CREATE TABLE "Bookmarks" (
    "crossingName" TEXT NOT NULL,
    "border" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "borderRegion" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "portStatus" TEXT NOT NULL,
    "passengerVehicleWait" TEXT NOT NULL,
    "pedestrianLaneWait" TEXT NOT NULL,

    CONSTRAINT "Bookmarks_pkey" PRIMARY KEY ("crossingName")
);

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
