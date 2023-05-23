ALTER TABLE
    "public"."comment"
ADD
    COLUMN "user_id" integer NOT NULL CONSTRAINT "comment_user_id_fkey" REFERENCES "public"."user" ("id") ON UPDATE CASCADE ON DELETE CASCADE;