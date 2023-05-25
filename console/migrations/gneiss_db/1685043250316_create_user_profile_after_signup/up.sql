CREATE FUNCTION f_create_user_profile() RETURNS trigger AS $BODY$ 
BEGIN

INSERT INTO "public"."profile" (user_id) VALUES (NEW.id);
RETURN NEW;

END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER t_create_user_profile AFTER
INSERT
    ON "public"."user" FOR EACH ROW EXECUTE PROCEDURE f_create_user_profile();