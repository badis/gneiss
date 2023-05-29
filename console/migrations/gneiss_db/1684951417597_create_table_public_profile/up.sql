CREATE TABLE "public"."profile" (
    "user_id" integer NOT NULL,
    "guid" uuid,
    "username" text,
    "firstname" text,
    "lastname" text,
    "title" text,
    "about" text,
    "mobile" text,
    "country" text,
    "gender" boolean,
    "birthday" date,
    PRIMARY KEY ("user_id"),
    FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE cascade ON DELETE cascade,
    FOREIGN KEY ("username") REFERENCES "public"."user"("username") ON UPDATE cascade ON DELETE cascade
);

CREATE FUNCTION f_create_user_profile() RETURNS trigger AS $BODY$ 
BEGIN

INSERT INTO
    "public"."profile" (user_id, guid, username)
VALUES
    (NEW.id, gen_random_uuid(), NEW.username);

RETURN NEW;

END;

$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER t_create_user_profile
AFTER
INSERT
    ON "public"."user" FOR EACH ROW EXECUTE PROCEDURE f_create_user_profile();