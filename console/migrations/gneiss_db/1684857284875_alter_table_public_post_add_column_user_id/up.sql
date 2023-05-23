ALTER TABLE
    "public"."post"
ADD
    COLUMN "user_id" integer NOT NULL CONSTRAINT "post_user_id_fkey" REFERENCES "public"."user" ("id") ON UPDATE cascade ON DELETE cascade;