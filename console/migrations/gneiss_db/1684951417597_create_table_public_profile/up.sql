CREATE TABLE "public"."profile" (
    "user_id" integer NOT NULL,
    "firstname" text,
    "lastname" text,
    "title" text,
    "about" text,
    "mobile" text,
    "country" text,
    "gender" boolean,
    "birthday" date,
    PRIMARY KEY ("user_id"),
    FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE cascade ON DELETE cascade
);