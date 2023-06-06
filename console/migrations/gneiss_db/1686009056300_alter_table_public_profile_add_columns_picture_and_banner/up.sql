ALTER TABLE
    "public"."profile"
ADD
    COLUMN "picture" uuid NULL CONSTRAINT "profile_picture_fkey" REFERENCES "public"."file" ("guid") ON UPDATE RESTRICT ON DELETE
SET
    NULL;

ALTER TABLE
    "public"."profile"
ADD
    COLUMN "banner" uuid NULL CONSTRAINT "profile_banner_fkey" REFERENCES "public"."file" ("guid") ON UPDATE RESTRICT ON DELETE
SET
    NULL;