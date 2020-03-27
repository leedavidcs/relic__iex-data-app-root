# Migration `20200322200849-with-temp-header-string`

This migration has been generated by leedavidcs at 3/22/2020, 8:08:49 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."StockPortfolio" DROP CONSTRAINT IF EXiSTS "StockPortfolio_user_fkey",
ADD COLUMN "headers" text []  ;

ALTER TABLE "public"."StockPortfolio" ADD FOREIGN KEY ("user")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

DROP TABLE "public"."StockPortfolioHeader";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200303091812-with-unique-user-name-stock-portfolio..20200322200849-with-temp-header-string
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -19,22 +19,22 @@
   createdAt     DateTime @default(now())
   updatedAt     DateTime @updatedAt
 }
-model StockPortfolioHeader {
-  id        String @id @default(uuid())
-  name      String
-  dataKey   String
-  width     Int @default(100)
-  frozen    Boolean @default(false)
-  resizable Boolean @default(true)
-}
+// model StockPortfolioHeader {
+//   id        String @id @default(uuid())
+//   name      String
+//   dataKey   String
+//   width     Int @default(100)
+//   frozen    Boolean @default(false)
+//   resizable Boolean @default(true)
+// }
 model StockPortfolio {
   id        String @id @default(uuid())
   user      User
   name      String
-  headers   StockPortfolioHeader[]
+  headers   String[]
   tickers   String[]
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
```

