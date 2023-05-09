CREATE TABLE "public"."like" (
  "id" serial NOT NULL,
  "post_id" integer NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON UPDATE cascade ON DELETE cascade
);