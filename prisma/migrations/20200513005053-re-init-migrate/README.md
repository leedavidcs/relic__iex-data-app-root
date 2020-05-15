# Migration `20200513005053-re-init-migrate`

This migration has been generated by leedavidcs at 5/13/2020, 12:50:53 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Transaction" ALTER COLUMN "status" SET DEFAULT 'PENDING';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200513005053-re-init-migrate
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,160 @@
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
+  timezone      String   @default("America/Los_Angeles")
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+}
+
+// Commented out until embedded types are available
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
+  settings  StockPortfolioSettings
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+
+  @@unique([userId, name])
+}
+
+model StockPortfolioSettings {
+  stockPortfolio   StockPortfolio @relation(fields: [stockPortfolioId], references: [id])
+  stockPortfolioId String         @id
+  enableSnapshots  Boolean        @default(false)
+}
+
+model Balance {
+  user    User   @relation(fields: [userId], references: [id])
+  userId  String @id
+  credits Int    @default(0)
+}
+
+enum TransactionStatus {
+  FAILED
+  PENDING
+  SUCCEEDED
+}
+
+model Transaction {
+  id                String            @id @default(cuid())
+  user              User              @relation(fields: [userId], references: [id])
+  userId            String
+  creditsBefore     Int
+  creditsTransacted Int
+  createdAt         DateTime          @default(now())
+  paymentIntentId   String?           @unique
+  status            TransactionStatus @default(PENDING)
+}
+
+model StripeDetails {
+  user       User   @relation(fields: [userId], references: [id])
+  userId     String @id
+  customerId String @unique
+}
+
+enum WebhookType {
+  StockDataRetrieved
+}
+
+model Webhook {
+  id               String         @id @default(cuid())
+  stockPortfolio   StockPortfolio @relation(fields: [stockPortfolioId], references: [id])
+  stockPortfolioId String
+  name             String
+  secret           String?
+  type             WebhookType
+  url              String
+  timeout          Int            @default(30000)
+  createdAt        DateTime       @default(now())
+
+  @@unique([stockPortfolioId, name])
+}
+
+model Snapshot {
+  id               String         @id @default(cuid())
+  tickers          String[]
+  headers          String[]
+  stockPortfolio   StockPortfolio @relation(fields: [stockPortfolioId], references: [id])
+  stockPortfolioId String
+  data             String[]
+  createdAt        DateTime       @default(now())
+}
+
+// Each stock-portfolio tracks its latest data-fetch
+model LatestSnapshot {
+  snapshot         Snapshot       @relation(fields: [snapshotId], references: [id])
+  snapshotId       String         @unique
+  stockPortfolio   StockPortfolio @relation(fields: [stockPortfolioId], references: [id])
+  stockPortfolioId String         @id
+  updatedAt        DateTime       @updatedAt
+}
+
+enum Day {
+  Mon
+  Tues
+  Wed
+  Thurs
+  Fri
+  Sat
+  Sun
+}
+
+enum Recurrence {
+  Once
+  Weekly
+  Daily
+}
+
+model ScheduledEvent {
+  id         String   @id @default(cuid())
+  user       User     @relation(fields: [userId], references: [id])
+  userId     String
+  recurrence Recurrence?
+  days       Day[]
+  hour       Int      @default(0)
+  minute     Int      @default(0)
+  interval   Int?
+  next       DateTime @default(now())
+}
+
+enum StockPortfolioEventType {
+  DataRetrieved
+}
+
+model StockPortfolioEvent {
+  scheduledEvent   ScheduledEvent          @relation(fields: [scheduledEventId], references: [id])
+  scheduledEventId String                  @id
+  type             StockPortfolioEventType
+  stockPortfolio   StockPortfolio          @relation(fields: [stockPortfolioId], references: [id])
+  stockPortfolioId String
+
+  @@unique([stockPortfolioId, type])
+}
```

