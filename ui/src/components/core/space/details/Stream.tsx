import { useQuery } from "@apollo/client";
import { FC } from "react";

import { GET_POSTS_BY_USER_AND_SPACE, TPost } from "@/api/graphql/post";
import { PostCard, PostCreateForm } from "@/components/core/post";
import { Container, Skeleton } from "@/components/presentational";

interface StreamProps {
  space_id: number;
  username: string;
}
const Stream: FC<StreamProps> = ({ username, space_id }) => {
  const { data, loading: loadingPosts } = useQuery(GET_POSTS_BY_USER_AND_SPACE, {
    variables: {
      username,
      space_id
    },
  });

  if (data && !loadingPosts) {
    return (
      <Container>
        <PostCreateForm origin="space" />
        {data.posts.map((p: TPost, index: number) => {
          return <PostCard key={index} post={{ ...p, origin: "space" }} />;
        })}
      </Container>
    );
  }
  return (
    <Container>
      <Skeleton variant="rectangular" width={"100hw"} height={"1vh"} />
    </Container>
  );
};

export { Stream };
