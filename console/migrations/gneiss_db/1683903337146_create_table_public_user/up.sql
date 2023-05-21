CREATE TABLE "public"."user_status" (
    "value" text NOT NULL,
    "description" text NOT NULL,
    PRIMARY KEY ("value")
);

INSERT INTO
    "public"."user_status"("value", "description")
VALUES
    ('disabled', 'User is disabled'),
    ('enabled', 'User is active'),
    (
        'need_approval',
        'User account pending approval'
    );

CREATE TABLE "public"."user" (
    "id" serial NOT NULL,
    "username" text NOT NULL UNIQUE,
    "email" text NOT NULL UNIQUE,
    "status" text NOT NULL DEFAULT 'need_approval',
    "password" text NOT NULL,
    "hashed_refresh_token" text,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("status") REFERENCES "public"."user_status"("value") ON UPDATE cascade ON DELETE restrict
);

CREATE
OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"() RETURNS TRIGGER AS $$ 
DECLARE _new record;

BEGIN _new := NEW;

_new."updated_at" = NOW();

RETURN _new;

END;

$$ LANGUAGE plpgsql;

CREATE TRIGGER "set_public_user_updated_at" BEFORE
UPDATE
    ON "public"."user" FOR EACH ROW EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_user_updated_at" ON "public"."user" IS 'trigger to set value of column "updated_at" to current timestamp on row update';