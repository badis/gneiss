CREATE TABLE "public"."like" (
  "id" serial NOT NULL,
  "post_id" integer NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON UPDATE cascade ON DELETE cascade
);

CREATE
OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"() RETURNS TRIGGER AS $ $ DECLARE _new record;

BEGIN _new := NEW;

_new."updated_at" = NOW();

RETURN _new;

END;

$ $ LANGUAGE plpgsql;

CREATE TRIGGER "set_public_like_updated_at" BEFORE
UPDATE
  ON "public"."like" FOR EACH ROW EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_like_updated_at" ON "public"."like" IS 'trigger to set value of column "updated_at" to current timestamp on row update';