import { GET_ALL_POSTS, TPost } from "@/api/graphql/post";
import { useQuery } from "@apollo/client";
import { FC } from "react";
import { PostCard, PostCreateForm } from "../post";
import { Container, Skeleton } from "@/components/presentational";

interface WallProps {}
const Wall: FC<WallProps> = () => {
  const { data, loading: loadingPosts } = useQuery(GET_ALL_POSTS);

  if (data && !loadingPosts) {
    return (
      <Container>
        <PostCreateForm origin="wall" />
        {data.posts.map((p: TPost, index: number) => {
          return <PostCard key={index} post={{ ...p, origin: "wall" }} />;
        })}
      </Container>
    );
  }
  return (
    <Container>
      <Skeleton variant="rectangular" width={"100hw"} height={"1vh"} />;
    </Container>
  );
};

export { Wall };
