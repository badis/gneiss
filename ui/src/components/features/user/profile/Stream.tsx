import { useQuery } from "@apollo/client";
import { FC } from "react";

import { GET_POSTS_BY_USER, TPost } from "@/api/graphql/post";
import { PostCard } from "@/components/features/post";
import { Container, Skeleton } from "@/components/presentational";

interface StreamProps {
  username: string;
}
const Stream: FC<StreamProps> = ({ username }) => {
  const { data, loading: loadingPosts } = useQuery(GET_POSTS_BY_USER, {
    variables: {
      username,
    },
  });

  if (data && !loadingPosts) {
    return (
      <Container>
        {data.posts.map((p: TPost, index: number) => {
          return <PostCard key={index} post={{ ...p, origin: "profile" }} />;
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
