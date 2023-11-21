CREATE TABLE "public"."space_membership" (
    "id" serial NOT NULL,
    "space_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "joined_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("space_id") REFERENCES "public"."space"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."space_membership" IS E'Users can be members of multiple spaces, and spaces can have multiple members';