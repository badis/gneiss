CREATE TABLE "public"."space" (
  "id" serial NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id")
);

COMMENT ON TABLE "public"."space" IS E'Dedicated place for a subset of users to connect and share privately';

CREATE
OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"() RETURNS TRIGGER AS $$ DECLARE _new record;

BEGIN _new := NEW;

_new."updated_at" = NOW();

RETURN _new;

END;

$$ LANGUAGE plpgsql;

CREATE TRIGGER "set_public_space_updated_at" BEFORE
UPDATE
  ON "public"."space" FOR EACH ROW EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_space_updated_at" ON "public"."space" IS 'trigger to set value of column "updated_at" to current timestamp on row update';