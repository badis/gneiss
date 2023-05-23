ALTER TABLE
    "public"."like"
ADD
    COLUMN "user_id" integer NOT NULL CONSTRAINT "like_user_id_fkey" REFERENCES "public"."user" ("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE
    "public"."like"
ADD
    CONSTRAINT "like_post_id_user_id_key" UNIQUE ("post_id", "user_id");