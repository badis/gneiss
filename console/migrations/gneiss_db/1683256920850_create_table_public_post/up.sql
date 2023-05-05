CREATE TABLE "public"."post" ("id" serial NOT NULL, "message" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
