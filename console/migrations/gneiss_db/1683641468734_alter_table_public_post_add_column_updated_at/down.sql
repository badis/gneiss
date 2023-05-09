DROP TRIGGER "set_public_post_updated_at" ON "public"."post";

DROP FUNCTION "public"."set_current_timestamp_updated_at"();

ALTER TABLE "public"."post" DROP COLUMN "updated_at";
