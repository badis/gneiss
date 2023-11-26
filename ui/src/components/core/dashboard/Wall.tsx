import { useQuery } from "@apollo/client";
import { FC } from "react";

import {
  GET_ALL_POSTS,
  PostInterface,
  PostOriginEnum,
} from "@/api/graphql/post";
import { Container, Skeleton } from "@/components/presentational";
import { PostCard } from "../post";

interface WallProps {}
const Wall: FC<WallProps> = () => {
  const { data, loading: loadingPosts } = useQuery(GET_ALL_POSTS);

  if (data && !loadingPosts) {
    return (
      <Container>
        {data.posts.map((post: PostInterface, index: number) => {
          return (
            <PostCard
              key={index}
              post={{ ...post, origin: PostOriginEnum.Wall }}
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

export { Wall };
