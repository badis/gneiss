alter table
    "public"."post"
add
    column "space_id" integer null;

alter table
  "public"."post"
add
  constraint "post_space_id_fkey" foreign key ("space_id") references "public"."space" ("id") on update cascade on delete cascade;