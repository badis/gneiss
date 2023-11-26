import { useQuery } from "@apollo/client";
import { FC } from "react";

import {
  GET_POSTS_BY_SPACE,
  PostInterface,
  PostOriginEnum,
} from "@/api/graphql/post";
import { PostCard, PostCreateForm } from "@/components/core/post";
import { Container, Skeleton } from "@/components/presentational";

interface StreamProps {
  space_id: number;
  username: string;
}
const Stream: FC<StreamProps> = ({ space_id }) => {
  const { data, loading: loadingPosts } = useQuery(GET_POSTS_BY_SPACE, {
    variables: {
      space_id,
    },
  });

  if (data && !loadingPosts) {
    return (
      <Container>
        <PostCreateForm space_id={space_id} />
        {data.posts.map((post: PostInterface, index: number) => {
          return (
            <PostCard
              key={index}
              post={{ ...post, origin: PostOriginEnum.Space }}
            />
          );
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
