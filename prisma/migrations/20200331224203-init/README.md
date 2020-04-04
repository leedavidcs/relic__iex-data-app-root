# Migration `20200331224203-init`

This migration has been generated by leedavidcs at 3/31/2020, 10:42:03 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" text  NOT NULL ,
    "emailVerified" boolean  NOT NULL DEFAULT false,
    "id" text  NOT NULL ,
    "password" text  NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL ,
    "username" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."StockPortfolio" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "headers" text []  ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "tickers" text []  ,
    "updatedAt" timestamp(3)  NOT NULL ,
    "userId" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Balance" (
    "credits" integer  NOT NULL DEFAULT 0,
    "userId" text  NOT NULL ,
    PRIMARY KEY ("userId")
) 

CREATE TABLE "public"."Transaction" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creditsBefore" integer  NOT NULL ,
    "creditsTransacted" integer  NOT NULL ,
    "id" text  NOT NULL ,
    "userId" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "User.username" ON "public"."User"("username")

CREATE UNIQUE INDEX "StockPortfolio.userId_name" ON "public"."StockPortfolio"("userId","name")

ALTER TABLE "public"."StockPortfolio" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Balance" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Transaction" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200331224203-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,58 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id            String   @id @default(cuid())
+  email         String   @unique
+  emailVerified Boolean  @default(false)
+  password      String
+  username      String   @unique
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+}
+
+// model StockPortfolioHeader {
+//   id        String @id @default(cuid())
+//   name      String
+//   dataKey   String
+//   width     Int @default(100)
+//   frozen    Boolean @default(false)
+//   resizable Boolean @default(true)
+// }
+
+model StockPortfolio {
+  id        String   @id @default(cuid())
+  user      User     @relation(fields: [userId], references: [id])
+  userId    String
+  name      String
+  headers   String[]
+  tickers   String[]
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+
+  @@unique([userId, name])
+}
+
+model Balance {
+  user    User   @relation(fields: [userId], references: [id])
+  userId  String @id
+  credits Int    @default(0)
+}
+
+model Transaction {
+  id                String   @id @default(cuid())
+  user              User     @relation(fields: [userId], references: [id])
+  userId            String
+  creditsBefore     Int
+  creditsTransacted Int
+  createdAt         DateTime @default(now())
+}
```

