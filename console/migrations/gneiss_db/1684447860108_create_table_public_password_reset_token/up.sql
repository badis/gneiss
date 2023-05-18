CREATE TABLE "public"."password_reset_token" (
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "hashed_reset_token" text NOT NULL,
    "expires_at" timestamptz NOT NULL DEFAULT now() + interval '1 day',
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE cascade ON DELETE cascade,
    UNIQUE ("user_id", "hashed_reset_token")
);