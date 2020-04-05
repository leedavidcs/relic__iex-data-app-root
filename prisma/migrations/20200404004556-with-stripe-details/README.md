# Migration `20200404004556-with-stripe-details`

This migration has been generated by leedavidcs at 4/4/2020, 12:45:56 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."StripeDetails" (
    "customerId" text   ,
    "userId" text  NOT NULL ,
    PRIMARY KEY ("userId")
) 

ALTER TABLE "public"."StripeDetails" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200331224203-init..20200404004556-with-stripe-details
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
@@ -55,4 +55,10 @@
   creditsBefore     Int
   creditsTransacted Int
   createdAt         DateTime @default(now())
 }
+
+model StripeDetails {
+  user       User   @relation(fields: [userId], references: [id])
+  userId     String @id
+  customerId String?
+}
```

