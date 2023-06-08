CREATE TABLE "public"."file" (
    "id" serial NOT NULL,
    "guid" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    "user_id" integer NOT NULL,
    "filename" text NOT NULL,
    "key" text NOT NULL,
    "mimetype" text NOT NULL,
    "size" integer NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE cascade ON DELETE cascade
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;