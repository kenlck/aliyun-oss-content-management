/*
  Warnings:

  - A unique constraint covering the columns `[asset_code]` on the table `assets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `asset_code` to the `assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assets" ADD COLUMN     "asset_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "assets_asset_code_key" ON "assets"("asset_code");
