DROP TRIGGER t_create_user_profile ON "public"."user";

DROP FUNCTION f_create_user_profile();

DROP TABLE "public"."profile" CASCADE;